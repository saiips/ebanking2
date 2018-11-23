import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationDataService {

    getPermissions(): Promise<any> {

        let permissions: Array<string>;

        permissions = ['READ'];

        return new Promise(resolve => {
            resolve(permissions);
        });

    }

}