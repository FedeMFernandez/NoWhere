import { ROUTE } from './../constants/route.constant';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable(/* {
    providedIn: 'root',
} */)
export class NavService {
    private data: any;

    constructor(private navCtrl: NavController) {}

    public push(url: string, data?: any): void {
        this.data = data;
        this.navCtrl.navigateForward(url);
    }

    public pop(url?: string, data?: any): void {
        if (data) {
            this.data = data;
        }
        if (url !== undefined) {
            this.navCtrl.navigateBack(url);
        } else {
            this.navCtrl.pop();
        }
    }

    public popToRoot(): void {
        this.navCtrl.navigateRoot(ROUTE.HOME);
    }

    public getParam<T>(key: string): T | undefined {
        if (this.data[key] !== undefined) {
            return this.data[key] as T;
        }
        return undefined;
    }

    public getObject<T>(): T | undefined {
        let result: any;
        if (this.data !== undefined) {
            result = this.data as T;
        }
        return result;
    }

    public setRoot(url: string, data?: any): void {
        this.data = data;
        this.navCtrl.navigateRoot(url);
    }

    public exit(): void {
        const key = 'app';
        navigator[key].exitApp();
    }

    public updateByKey(key: string, value: any): void {
        if (this.data !== undefined) {
            this.data[key] = value;
        }
    }
}
