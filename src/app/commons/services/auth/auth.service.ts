
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, tap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AppState } from '../../store/reducers/app.reducer';
import { UserModel } from '../../models/user.model';
import { setUser, clearUser } from '../../store/actions/auth.actions';
import { COLLECTION } from '../../constants/collection.constants';
import { IdentityService } from './../identity.service';
import { ChronometerService } from 'src/app/commons/services/chronometer/chronometer.service';
import { ROUTE } from './../../constants/route.constant';
import { NavService } from './../nav.service';
import { clearUsage } from './../../store/actions/home.actions';

@Injectable()
export class AuthService {

    get isAuth(): Observable<boolean> {
        if (this.identityService.getUser() !== undefined) { return of(true); }
        return this.ngFireAuth.authState.pipe(
                map(user => user !== null),
                tap(
                    state => {
                        if (!state) {
                            this.navService.push(ROUTE.AUTH, undefined);
                        }
                    }
                ),
                take(1)
            );
    }

    constructor(
        private store: Store<AppState>,
        private identityService: IdentityService,
        private ngFireAuth: AngularFireAuth,
        private ngFirestore: AngularFirestore,
        private navService: NavService,
        private chronometerService: ChronometerService
    ) { }

    public init() {
        const user = this.identityService.getUser();
        if (user) {
           this.setUserData(user);
        } else {
            this.ngFireAuth.authState
            .pipe(
                take(1)
            )
            .subscribe(async (auth) => {
                if (auth) {
                    const userData = await this.getUserData(auth.uid);
                    this.setUserData(userData);
                }
            });
        }
    }

    public async login(email: string, password: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.ngFireAuth.signInWithEmailAndPassword(email, password)
            .then(async (auth) => {
                const user = await this.getUserData(auth.user.uid);
                this.setUserData(user);
                resolve();
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    public async register(name: string, email: string, password: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            this.ngFireAuth.createUserWithEmailAndPassword(email, password)
            .then(({ user }) => {
                const userData = new UserModel(user.uid, name, email);
                this.ngFirestore.doc(`${COLLECTION.USERS}/${user.uid}`).set({
                    ...userData
                });
                this.identityService.setUser(userData);
                this.store.dispatch(setUser({
                    user: userData,
                }));
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    public logOut(): void {
        /**
         * CLEARS
         */

        // User
        this.ngFireAuth.signOut();
        this.store.dispatch(clearUser());
        this.identityService.clearUser();

        // Chronometer
        this.chronometerService.stopClock();

        // Home
        this.store.dispatch(clearUsage());
    }

    private setUserData(user: UserModel): void {
        this.identityService.setUser(user);
        this.store.dispatch(setUser({
            user
        }));
    }

    private getUserData(id: string): Promise<UserModel> {
        return new Promise((resolve) => {
            this.ngFirestore.doc(`${COLLECTION.USERS}/${id}`).get()
            .pipe(
                take(1)
            )
            .subscribe(doc => {
                resolve(doc.data() as UserModel);
            });
        });
    }
}
