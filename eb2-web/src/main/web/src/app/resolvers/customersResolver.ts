import { Customer } from '../_models/customer';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CustomerService } from '../_services/customer.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CustomersResolver implements Resolve<Customer[]> {

    constructor(private _customerService: CustomerService) {

    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer[]>|Promise<Customer[]>|Customer[] {
        // console.log("resolve route: " + route);
        // console.log("resolve state: " + state);
        let id = +route.params['id'];
        // return this._customerService.getCustomerById(id)
        //     .catch(err => Observable.of(new Customer()));
        return this._customerService.getCustomers();
    }
}
