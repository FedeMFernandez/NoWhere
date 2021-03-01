import { UserModel } from './user.model';

export class TimerModel {
    id: string;
    from: Date;
    to: Date;
    user: UserModel;
    totalMinutes: number;

    constructor(id?: string, from?: Date, to?: Date, user?: UserModel, minutesUsed?: number) {
        this.id = id || '';
        this.from = from || new Date();
        this.to = to || new Date();
        this.user = user || new UserModel();
        this.totalMinutes = minutesUsed || 0;
    }
}
