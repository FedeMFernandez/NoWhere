import { environment } from 'src/environments/environment';
import { randomColor } from '../functions/random.functions';

export class UserModel {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;

    constructor(id?: string, name?: string, email?: string, avatarUrl?: string) {
        this.id = id || '';
        this.name = name || '';
        this.email = email || '';
        this.avatarUrl = avatarUrl || `${environment.uiAvatars.apiURL}/?name=${name}&background=${randomColor()}`;
    }
}
