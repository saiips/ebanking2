import { Resolve } from '@angular/router';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { AuthGroup } from './../_guards/auth.types';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AuthorizationDataService } from './authorization-data.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    permissions: Array<string>;

    constructor(private http: HttpClient, private authorizationDataService: AuthorizationDataService) { }

    login(username: string, password: string) {
        return this.http.post<any>('/api/users/authenticate', { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    
                    this.initializePermissions();
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    hasPermission(authGroup: AuthGroup): Promise<boolean> | boolean {
        if (!this.permissions) {
            // Otherwise, must request permissions from the API first
            const promise = new Promise<boolean>((resolve, reject) => {
                this.initializePermissions()
                    .then(() => {
                        if (authGroup) {
                            resolve(this.hasPermission(authGroup));
                        } else {
                            resolve(this.hasPermission(null));
                        }

                    }).catch(() => {
                        resolve(false);
                    });
            });

            return promise;

        } else {
            if (this.permissions && this.permissions.find(permission => {
                return permission === authGroup;
            })) {
                return true;
            }
            return false;
        }
    }

    initializePermissions() {
        return new Promise((resolve, reject) => {
             // Call API to retrieve the list of actions this user is permitted to perform.
             // In this case, the method returns a Promise, but it could have been implemented as an Observable
             this.authorizationDataService.getPermissions()
                  .then(permissions => {
                        this.permissions = permissions;
                        resolve();
                   })
                   .catch((e) => {
                        reject(e);
                   });
        });
    }    
}