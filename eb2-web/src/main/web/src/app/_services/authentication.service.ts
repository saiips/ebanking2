
import { Resolve } from '@angular/router';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { AuthGroup } from './../_guards/auth.types';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AuthorizationDataService } from './authorization-data.service';
import { CryptoService } from './crypto.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    headers: string;
    eb2Url: string = environment.eb2Url;
    permissions: Array<string>;
    tokenArray: Array<string>;
    conversionOutput: string;

    constructor(private http: HttpClient, private authorizationDataService: AuthorizationDataService, private cookieService: CookieService, private cryptoService: CryptoService) { }

    login(username: string, password: string) {
        return this.http.post<any>(this.eb2Url + '/sso/user/authenticate', { "client_name":"rest", "username":username, "password":password, "pinblock":"x" }, {observe: 'response'})
            .pipe(map(resp => {
                // login successful if there's a jwt token in the response header
                if (resp && resp.status == 200) {
                    let token="";
                    // access token
                    const accessToken = resp.headers.get(environment.accessTokenHeader);
                    if (accessToken) {
                        this.tokenArray = accessToken.split(" "); 
                        token = this.tokenArray[1];
                        // token = this.cryptoService.encryptToken(this.tokenArray[1]);
                        this.cookieService.set(environment.accessTokenCookieKey, token, 1, "/eb2", "cas.example.org", false);
                        // store resp details and jwt token in local storage to keep resp logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(resp));
                    }

                    // refresh token
                    const refreshToken = resp.headers.get(environment.refreshTokenHeader);
                    if (refreshToken) {
                        this.tokenArray = refreshToken.split(" ");
                        token = this.tokenArray[1];
                        // token = this.cryptoService.encryptToken(this.tokenArray[1]);
                        this.cookieService.set(environment.refreshTokenCookieKey, token, 1, "/eb2", "cas.example.org", false);
                    }

                    this.initializePermissions();
                }

                return resp;
            }));
    }

    getAuthToken(): string {
        let accessToken = this.cookieService.get(environment.accessTokenCookieKey);
 
        if(accessToken != null) {
          // return this.cryptoService.decryptToken(accessToken);
          return accessToken;
        }
     
        return '';
    }

    getRefreshToken(): string {
        let refreshToken = this.cookieService.get(environment.refreshTokenCookieKey);
 
        if(refreshToken != null) {
          // return this.cryptoService.decryptToken(refreshToken);
          return refreshToken;
        }
     
        return '';
    }

    refreshToken(): Observable<string> {
        console.log("refresh token");
        const refreshToken = this.cookieService.get(environment.refreshTokenCookieKey);

        let headers: HttpHeaders = new HttpHeaders();
        // headers = headers.append(environment.refreshTokenHeader, environment.grantType +  this.cryptoService.decryptToken(refreshToken));
        headers = headers.append(environment.refreshTokenHeader, environment.grantType +  refreshToken);
        console.log("headers=" + JSON.stringify(headers));

        return this.http.post<any>(this.eb2Url + '/sso/token/refresh', {}, {headers: headers, observe: 'response'})
            .pipe(map(resp => {
                console.log("resp=" + JSON.stringify(resp));
                let token = "";
                let tokenRefresh = "";
                if (resp && resp.status == 200) {
                    // access token
                    const accessToken = resp.headers.get(environment.accessTokenHeader);
                    console.log("accessToken = " + accessToken);
                    if (accessToken) {
                        this.tokenArray = accessToken.split(" "); 
                        token = this.tokenArray[1];
                        // token = this.cryptoService.encryptToken(token);
                        this.cookieService.set(environment.accessTokenCookieKey, token, 1, "/eb2", "cas.example.org", false);
                    }

                    // refresh token
                    const refreshToken = resp.headers.get(environment.refreshTokenHeader);
                    console.log("refreshToken = " + refreshToken);
                    if (refreshToken) {
                        this.tokenArray = refreshToken.split(" ");
                        tokenRefresh = this.tokenArray[1];
                        // tokenRefresh = this.cryptoService.encryptToken(tokenRefresh);                        
                        this.cookieService.set(environment.refreshTokenCookieKey, tokenRefresh, 1, "/eb2", "cas.example.org", false);
                    }                    
                }

                return token;
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