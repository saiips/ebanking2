import { Customer } from '../models/customer';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CustomerServiceV2 } from '../_services/customer.serviceV2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerResolver implements Resolve<Customer> {

    constructor(private _customerService: CustomerServiceV2) {

    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer>|Promise<Customer>|Customer {
        // console.log("resolve route: " + route);
        // console.log("resolve state: " + state);
        if (!route.params['id']) {
            return new Customer();
        }
        let id = +route.params['id'];
        // return this._customerService.getCustomerById(id)
        //     .catch(err => Observable.of(new Customer()));
        return this._customerService.getCustomerById(id);
    }
}
