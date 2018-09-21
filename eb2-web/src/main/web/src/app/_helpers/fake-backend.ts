import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let testUser = { id: 1, username: 'test', password: 'test', firstName: 'Peter', lastName: 'Tam' };
        let testCustomer= [
  {
    "customerID": "5ba376fa85b6eef63bcf7402",
    "ebid": "048cb8a8-0918-4bb8-8035-df8994b4a9fc",
    "fullName": "Mcdaniel Franklin",
    "title": "Mr.",
    "sex": "M",
    "dob": "2018-01-30",
    "mobileNo": "+852 (923) 560-3017",
    "optIn": true,
    "permEmail": "email@email.com",
    "tempEmail": "email@email.com",
    "lastUpdDateEmail": "2014-07-07",
    "lastUpdByEmail": "email@email.com",
    "skipEmailUpdProcess": true,
    "ebankType": false,
    "staffInd": false,
    "frstRegDate": "2016-11-29",
    "reRegDate": "2016-04-09",
    "lstLogonSuccDate": "2017-02-24",
    "loginFailCnt": 14,
    "lastLoginFailDate": "2016-05-05",
    "bioRemdrFlg": false,
    "bioRemdrDate": "2015-02-13",
    "status": true
  },
  {
    "customerID": "5ba376fac6c1037b4118bc27",
    "ebid": "530a5c02-9f41-4eb4-8d54-03f9c71d5755",
    "fullName": "Conrad Pope",
    "title": "Mr.",
    "sex": "F",
    "dob": "2014-05-29",
    "mobileNo": "+852 (992) 476-2995",
    "optIn": false,
    "permEmail": "email@email.com",
    "tempEmail": "email@email.com",
    "lastUpdDateEmail": "2018-06-03",
    "lastUpdByEmail": "email@email.com",
    "skipEmailUpdProcess": false,
    "ebankType": false,
    "staffInd": false,
    "frstRegDate": "2014-01-31",
    "reRegDate": "2016-11-12",
    "lstLogonSuccDate": "2017-10-14",
    "loginFailCnt": 9,
    "lastLoginFailDate": "2016-06-18",
    "bioRemdrFlg": true,
    "bioRemdrDate": "2017-04-03",
    "status": true
  }
]; 
          
          
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

          
            // authenticate
            if (request.url.endsWith('/api/users/authenticate') && request.method === 'POST') {
                if (request.body.username === testUser.username && request.body.password === testUser.password) {
                    // if login details are valid return 200 OK with a fake jwt token
                    let body = {
                        id: testUser.id,
                        username: testUser.username,
                        firstName: testUser.firstName,
                        lastName: testUser.lastName,
                        token: 'fake-jwt-token'
                    };
                    return of(new HttpResponse({ status: 200, body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // get users
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: [testUser] }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
          

            // get customers
            if (request.url.endsWith('/api/customers') && request.method === 'GET') {
               return of(new HttpResponse({ status: 200, body: testCustomer}));
            }
          
          
            // pass through any requests not handled above
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};