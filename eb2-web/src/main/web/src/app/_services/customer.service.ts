import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Customer } from '../_models';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CustomerService {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: HttpClient,  @Inject('BASE_URL') private baseUrl: string) { }

    getCustomer(): Observable<Customer> {
        return this.http.get<Customer>(this.baseUrl + 'api/customer/1');
    }

    // getCustomer(): Observable<Customer> {
    //     // return this.http.get<any>(this.baseUrl + 'api/customer/1')
    //     // .pipe(map(customer => {
    //     //     return customer.OUT_CUST_TAB.OUT_CUST_TAB_ITEM;
    //     // }));
    //
    //     // mock data
    //     let apiHost: string = '/eb2/assets/customer.json';
    //     return this.http.get<any>(apiHost)
    //             .pipe(map(customer => {
    //                 return customer.OUT_CUST_TAB.OUT_CUST_TAB_ITEM;
    //             })); 
    // }

    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.baseUrl + 'api/customers');
    }

    updateCustomer(customer: Customer) {

        console.log("customer = " + JSON.stringify(customer));

        return this.http.put(this.baseUrl + 'api/customer/' + customer.CUST_ID, JSON.stringify(customer), {headers: {'Content-Type':'application/json'}});
    }

    // update(customer: Customer): Promise<Array<Customer>> {
    //     return this.http
    //       .put(this.baseUrl + 'api/customer/' + customer.CUST_ID, JSON.stringify(customer), {headers: {'Content-Type':'application/json'}})
    //       .toPromise()
    //       .then( data => data.() as customer[])
    //       .catch(this.handleError);
    //   }    
    
    deleteCustomer(id: number) {
        return this.http.delete(this.baseUrl + 'api/customer/' + id, {headers: {'Content-Type':'application/json'}});
    }    

    createCustomer(customer: Customer) {
        return this.http.post(this.baseUrl + 'api/customer' , JSON.stringify(customer), {headers: {'Content-Type':'application/json'}});
    }    

    private handleError(error: any): Promise<Array<any>> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}