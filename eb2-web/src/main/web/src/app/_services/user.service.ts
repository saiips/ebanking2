import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Courses } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient,  @Inject('BASE_URL') private baseUrl: string) { }

    /* call mocked backend server */
    getAll() {
        // return this.http.get<User[]>(`${config.apiUrl}/users`);
        return this.http.get<User[]>('/api/users');
    }

    /* call real backend server */
    getCourses() {
        return this.http.get<Courses[]>(this.baseUrl + 'api/courses');
    }
}