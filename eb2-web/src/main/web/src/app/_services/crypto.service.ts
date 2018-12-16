import { Injectable, Inject } from '@angular/core';

import { Customer } from '../_models';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class CryptoService {

    public encryptToken(token: string): string {
        return CryptoJS.AES.encrypt(token, environment.cryptoPassword).toString();
    }

    public decryptToken(token: string): string {
        return CryptoJS.AES.decrypt(token, environment.cryptoPassword).toString(CryptoJS.enc.Utf8);
    }


}