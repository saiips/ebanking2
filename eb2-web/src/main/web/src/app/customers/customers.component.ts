import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Customer } from '../_models/customer';
import { CustomerService } from '../_services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(private customerService: CustomerService) { }

  customer : Customer;
  
  ngOnInit() {
    this.getCustomer();
  }
  
  getCustomer() : void {
     this.customerService.getCustomer().subscribe(customer => this.customer = customer);
  }

}
