import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User, Courses } from '../_models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class UserService {

    eb2Url: string = environment.eb2Url;

    constructor(private http: HttpClient,  @Inject('BASE_URL') private baseUrl: string, private cookieService: CookieService)  { }

    /* call mocked backend server */
    getAll(): Observable<User[]> {
        // return this.http.get<User[]>(`${config.apiUrl}/users`);
        return this.http.get<User[]>('/api/users');
    }

    /* call real backend server */
    getCourses() {

        let data = {};

        return this.http.post<Courses[]>(this.eb2Url + '/api/courses', data, { observe: 'response' })
            .pipe(map(resp => resp.body));

    }

}