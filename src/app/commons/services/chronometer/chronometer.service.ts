import { setLoading } from './../../store/actions/ui.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';

import * as ACTIONS from '../../store/actions/chronometer.actions';
import { TimerModel } from '../../models/timer.model';
import { IdentityService } from '../identity.service';
import { COLLECTION } from './../../constants/collection.constants';
import { threadSleep } from '../../functions/thread.functions';
import { UserModel } from '../../models/user.model';
import { pushUsage } from '../../store/actions/home.actions';
import { clearUsage } from './../../store/actions/home.actions';
import { AppState } from './../../store/reducers/app.reducer';

@Injectable()
export class ChronometerService {

    private interval: any;
    private currentUsage: TimerModel;

    constructor(
        private store: Store<AppState>,
        private ngFirestore: AngularFirestore,
        private identityService: IdentityService
    ) { }

    public async init() {
        const user = this.identityService.getUser();
        if (user) {
            this.currentUsage = this.identityService.getTimer();
            if (this.currentUsage) {
                await threadSleep(1000);
                this.startClock();
            } else {
                const { docs } = await this.ngFirestore.collection(COLLECTION.TIMERS).ref
                .where('to', '==', null)
                .where('user', '==', this.ngFirestore.doc(`/${COLLECTION.USERS}/${user.id}`).ref).get();
                if (docs.length) {
                    for (const doc of docs) {
                        const id = doc.id;
                        const from = doc.get('from').toDate();
                        this.currentUsage = new TimerModel(id, from);
                        break;
                    }
                    this.startClock();
                }
            }
        }
    }

    public async startTime(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const from = new Date();
            const user = this.identityService.getUser();
            this.ngFirestore.collection(COLLECTION.TIMERS).add({
                from,
                user: this.ngFirestore.doc(`${COLLECTION.USERS}/${user.id}`).ref,
                to: null,
            })
            .then(doc => {
                this.currentUsage = new TimerModel(doc.id, from);
                this.startClock();
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    public async stopTime(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            const to = new Date();
            const minutes = this.diffMinutes(to, this.currentUsage.from);
            const doc = this.ngFirestore.doc(`${COLLECTION.TIMERS}/${this.currentUsage.id}`);
            if (minutes > 0) {
                try {
                    await doc.update({
                        to,
                        total_minutes: this.diffMinutes(to, this.currentUsage.from)
                    });
                } catch (error) {
                    reject(error);
                }
            } else {
                try {
                    await doc.delete();
                } catch (error) {
                    reject(error);
                }
            }
            this.stopClock();
            resolve();
        });
    }

    private startClock() {
        let time = Math.round(((new Date().getTime() - this.currentUsage.from.getTime()) / 1000));
        this.interval = setInterval(() => {
          time += 1;
          if (this.interval !== undefined) {
            this.store.dispatch(ACTIONS.updateTime({
                time
            }));
          }
        }, 1000);
        this.identityService.setTimer(this.currentUsage);
        this.store.dispatch(
            ACTIONS.setChronometer({
                chronometer: {
                    time,
                    from: this.currentUsage.from,
                    started: true,
                    documentId: this.currentUsage.id
                }
            })
        );
    }

    public stopClock(): void {
        clearInterval(this.interval);
        this.interval = undefined;
        this.identityService.clearTimer();
        this.store.dispatch(ACTIONS.clearChronometer());
        this.currentUsage = {} as TimerModel;
    }

    private diffMinutes(to: Date, from: Date): number  {
      let diff = (to.getTime() - from.getTime()) / 1000;
      diff /= 60;
      return Math.round(diff);
    }

    public async getAll(month?: number): Promise<void> {
        this.store.dispatch(setLoading({
            loading: true
        }));
        const dateRef = new Date();
        dateRef.setMonth(month);
        const [ from, to ]  = [
            new Date(dateRef.getFullYear(), dateRef.getMonth()),
            new Date(dateRef.getFullYear(), dateRef.getMonth() + 1, 0, 23, 59)
        ];
        this.store.dispatch(clearUsage());
        this.ngFirestore.collection(COLLECTION.TIMERS).ref
        .orderBy('from')
        .startAt(from)
        .endAt(to)
        .onSnapshot(
            async (snapshot) => {
                await threadSleep(300);
                this.store.dispatch(clearUsage());
                if (snapshot.docs.length) {
                    snapshot.docs.forEach(async (doc) => {
                        const timer = {
                            id: doc.id,
                            from: doc.get('from').toDate(),
                            to: doc.get('to') ? doc.get('to').toDate() : null,
                            totalMinutes: doc.get('total_minutes') || 0
                        } as TimerModel;

                        const userDoc = await this.ngFirestore.doc(doc.get('user')).ref.get();
                        if (userDoc) {
                            timer.user = userDoc.data() as UserModel;
                            this.store.dispatch(pushUsage({
                                timer
                            }));
                        }
                    });
                }
                this.store.dispatch(setLoading({
                    loading: false
                }));
            },
            (error) => {
                this.store.dispatch(clearUsage());
                this.store.dispatch(setLoading({
                    loading: false
                }));
            }
        );
    }
}
