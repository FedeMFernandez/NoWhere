import { TimerModel } from '../models/timer.model';
import { setChronometer } from '../store/actions/chronometer.actions';
import { UserModel } from '../models/user.model';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { STORAGE_INDEX } from '../constants/storage-index.constant';

@Injectable()
export class IdentityService {

  constructor(
    private storageService: StorageService
  ) { }

  public setUser(user: UserModel): void {
    if (this.storageService.exists(STORAGE_INDEX.USER)) {
      this.storageService.remove(STORAGE_INDEX.USER);
    }
    this.storageService.setObject(STORAGE_INDEX.USER, user);
  }

  public getUser(): UserModel | undefined {
    let response: any;
    if (this.storageService.exists(STORAGE_INDEX.USER)) {
      response = this.storageService.getObject<UserModel>(STORAGE_INDEX.USER);
    }
    return response;
  }

  public clearUser(): void {
    if (this.storageService.exists(STORAGE_INDEX.USER)) {
      this.storageService.remove(STORAGE_INDEX.USER);
    }
  }

  public setTimer(timer: TimerModel): void {
    if (this.storageService.exists(STORAGE_INDEX.TIMER)) {
      this.storageService.remove(STORAGE_INDEX.TIMER);
    }
    this.storageService.setObject(STORAGE_INDEX.TIMER, timer);
  }

  public getTimer(): TimerModel | undefined {
    let response: any;
    if (this.storageService.exists(STORAGE_INDEX.TIMER)) {
      response = this.storageService.getObject<TimerModel>(STORAGE_INDEX.TIMER);
      response = new TimerModel(response.id, new Date(response.from), new Date(response.to));
    }
    return response;
  }

  public clearTimer(): void {
    if (this.storageService.exists(STORAGE_INDEX.TIMER)) {
      this.storageService.remove(STORAGE_INDEX.TIMER);
    }
  }

  public clear(): void {
    this.storageService.clear();
  }
}
