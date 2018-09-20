import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Customer } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerService {
    constructor(private http: HttpClient,  @Inject('BASE_URL') private baseUrl: string) { }

    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>('/api/customers');
    }

}