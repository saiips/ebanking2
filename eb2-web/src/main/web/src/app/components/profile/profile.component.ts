import { Component, OnInit } from '@angular/core';
import { Customer } from '../../_models/customer';
import { CustomerService } from '../../_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private customerService: CustomerService) { }
  
  customer: Customer;

  ngOnInit() {
    this.getCustomer();
  }

  getCustomer(): void {
    this.customerService.getCustomer().subscribe(customer => this.customer = customer);
  }
}