import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaderResponse, HttpParams, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse, HttpSentEvent } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { CryptoService } from '../_services/crypto.service';
import { AuthenticationService } from '../_services';
import { first, catchError } from 'rxjs/operators';
import { switchMap, map, finalize, filter, take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    private isRefreshingToken: boolean = false;
    private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);    

    constructor(private cookieService: CookieService, private cryptoService: CryptoService, private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {

        return next.handle(this.addTokenToRequest(request, this.authenticationService.getAuthToken()))
        .pipe(
          catchError(err => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401 && err.error.message == "JwtExpiredTokenException") {
                    return this.handleJwtExpiredException(request, next);
                } else if (err.status === 401) {
                    return <any>this.authenticationService.logout();
                } else {
                    return throwError(err);
                }
            }
          }));

        // // consider the /api only
        // if (request.url.indexOf("/api/") >= 0) {

        //     // Keeps the original request params. as a new HttpParams
        //     let newParams = new HttpParams({fromString: request.params.toString()});

        //     let token = this.cookieService.get(environment.accessTokenCookieKey);

        //     token = this.cryptoService.decryptToken(token);

        //     // token = "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiZGlyIn0..hyF6tyDeqvyjgYIR.QGh9PGq-i_8dHAKuwm_bPOlpHy6V81un-8EE1XOocwVCd9-k4In-WmMCWuloMw_GVR70XkNaJZ44BxBjclINkROyg3s7srPAHjTJxTF4naVDZTbdTXRwrLx_4fKA6lwnksQkjLU6F-ycj4RZVWbPj26guBa2nhDgm6Hnh2pAx3-XK8EHbXXdIe_04lVZRkMlNDULfqfnRToZ9CZJFiXN1K94AOKtx3sQkZqiHBHbDaeT_VWr-y_MuFojN1gEMXwvqm2jsuc4BiBoLR9mIM3oP_bLD3ozziDJExH_XseNLDpttBJGyP0_3rEI7UDLuQZrtfgy6thH7M_XfBYC2DuWz_FcoBGLJkNSKUo_XEEZvflTNQeNKCpli1S29HLf1Lsly7ZuiW6o8yS6Kx7RSqTMOuGi7RWnp4JPYULd7GOeY4DNOJ2wfgdWMH1fcIgXSdgKkmCGrP2-wViTarPqHZBaL5oqdb8qz8kq5ansloLxV5f-AjHtAIX6D5670qsOeNBWpkOBu70p80CLaW14FOt20_2dhf1MeBJ6UqKWLVGOmEi2U-qurW0K_pFMQcr3P1h0kHEsQK8qcQFytnEUnlYLA9Yh8DvVeWpvTseVO3NPZSS0emCJn28UuW0Z3SBShVX2tocEpcHM4S5Z1eMN-tcPvTGv9ozXDYlr5G-ia1epKfpWa4embFVVVCDJM6zcbND7gIEFI-iqQ17vN278g57aLO3DAvAy8VVOzziAfvBCQMUGYYVM9HdqCsuIvLFlka9ksxqLK2MhkQafyrqco5u-W6rCTDhmRbdiC2JDJlQrJ6JPklY_xOcC3VxruBul9R0IhDis1OV8d6p-qMk8SeF89hi9palFnJEN6KkrUobpI0xpx6jDSfYtMMw8n5FQQPV_gPqHbHbgMRKmYUkZJHy49ICh9LCues8tCix_MAZPUKNQny6sXu3gxDFWYNeUyAdNXqJKs6E2dOeqtdqUP7Hp2N33KDbykz2U5EDZDs1uFvjgY9Q0EuSwY4EsmqF6ikwmjQGc4Sf15b0mauxxOpR_aKngS4zVbhVzWQJleYL32MlD-q-AUTt8gdaFgQ.QypqCHu3wPUXWmyg2RxjgA";

        //     // Add any params (can also chain .append() but I was conditionally adding params)
        //     newParams = newParams.append('client_name', 'jwt');
        //     newParams = newParams.append('token',  token);

        //     // Clone the request with params instead of setParams
        //     request = request.clone({
        //         params: newParams
        //     });   
        // } 

        // return next.handle(request);

    }

    private addTokenToRequest(request: HttpRequest<any>, token: string) : HttpRequest<any> {
        // return request.clone({ setHeaders: { Authorization: `Bearer ${token}`}});

        // Keeps the original request params. as a new HttpParams
        let newParams = new HttpParams({fromString: request.params.toString()});
        
        // Add any params (can also chain .append() but I was conditionally adding params)
        newParams = newParams.append('client_name', 'jwt');
        newParams = newParams.append('token',  token);

        // Clone the request with params instead of setParams
        return request.clone({ params: newParams });   
    }

    private handleJwtExpiredException(request: HttpRequest<any>, next: HttpHandler) {
        console.log("JwtInterceptor :::::::::::::::::::::::::::::::::: handleJwtExpiredException");

        if(!this.isRefreshingToken) {
          this.isRefreshingToken = true;
    
          // Reset here so that the following requests wait until the token
          // comes back from the refreshToken call.
          this.tokenSubject.next(null);
    
          return this.authenticationService.refreshToken()
            .pipe(
              switchMap((token: string) => {
                if(token) {
                  this.tokenSubject.next(token);
                  return next.handle(this.addTokenToRequest(request, token));
                }
    
                return <any>this.authenticationService.logout();
              }),
              catchError(err => {
                return <any>this.authenticationService.logout();
              }),
              finalize(() => {
                this.isRefreshingToken = false;
              })
            );
        } else {
          this.isRefreshingToken = false;
    
          return this.tokenSubject
            .pipe(filter(token => token != null),
              take(1),
              switchMap(token => {
              return next.handle(this.addTokenToRequest(request, token));
            }));
        }
      }    

}