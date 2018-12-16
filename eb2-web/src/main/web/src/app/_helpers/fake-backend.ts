import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let testUser = { id: 1, username: 'test', password: 'test', firstName: 'Peter', lastName: 'Tam' };
        let testCustomer = [{
                "CUST_ID" : 1,
                "EBID" : 1,
                "FULL_NAME" : "Dicky",
                "TITLE" : "Test",
                "SEX" : "M",
                "DOB" : "2018-09-27T09:16:15.000-07:00",
                "MOB_NUMBER" : "98765432",
                "MOB_COUNTRY_CODE" : "HK",
                "MOB_AREA_CODE" : "HK",
                "OPT_IN" : "Y",
                "PERM_EMAIL" : "dicky.tse@oracle.com",
                "TEMP_EMAIL" : "dicky.tse@oracle.com",
                "PERM_EMAIL_LAST_UPDATE_DATE" : "2018-09-27T09:16:52.000-07:00",
                "PERM_EMAIL_LAST_UPDATE_BY" : "System",
                "SKIP_EMAIL_UPDATE_PROCESS" : "1",
                "EBANK_TYPE" : "N",
                "STAFF_INDICATOR" : "N",
                "FIRST_REGISTRATION_DATE" : "2018-09-27T09:17:20.000-07:00",
                "RE_REGISTRATION_DATE" : "2018-09-27T09:17:24.000-07:00",
                "LAST_LOGIN_SUCCESSFUL_DATE" : "2018-09-27T09:17:26.000-07:00",
                "LOGIN_FAIL_COUNT" : 0,
                "LAST_LOGIN_FAIL_DATE" : "2018-09-27T09:17:33.000-07:00",
                "BIOMETRIC_REMINDER_FLAG" : "N",
                "BIOMETRIC_REMINDER_DATE" : "2018-09-27T09:17:41.000-07:00",
                "STATUS" : "ACTIVE",
                "VERSION" : "1"
          }];
          
        
          
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            /*
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
            */

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
            // if (request.url.endsWith('/api/customer/1') && request.method === 'GET') {
            //    return of(new HttpResponse({ status: 200, body: testCustomer.OUT_CUST_TAB.OUT_CUST_TAB_ITEM}));
            // }

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