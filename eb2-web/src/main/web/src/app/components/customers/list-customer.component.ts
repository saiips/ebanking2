import { Component, OnInit } from '@angular/core';
import { Customer } from '../../_models/customer';
import { CustomerService } from '../../_services/customer.service';
import { Router } from "@angular/router";
import { DataService } from "../../_services";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  customers: Customer[];

  constructor(private router: Router, private data: DataService, private customerService: CustomerService) { }

  ngOnInit() {
    this.getListCustomer();
  }

  getListCustomer() : void {
    this.customerService.getCustomers().subscribe(data => { this.customers = data} );
 }  

  deleteCustomer(customer: Customer): void {
    this.customerService.deleteCustomer(customer.CUST_ID)
      .subscribe( data => {
        this.customers = this.customers.filter(u => u !== customer);
      })
  };

  editCustomer(customer: Customer): void {
    // localStorage.removeItem("editCustomerId");
    // localStorage.setItem("editCustomerId", customer.CUST_ID.toString());

    // Alternative 1: pass data by query params
    // this.router.navigate(['editCustomer'], { queryParams: { editCustomer: JSON.stringify(customer) }});

    // Alternative 2: pass data via DataService
    this.data.changeMessage(JSON.stringify(customer));
    this.router.navigate(['customers/' + customer.CUST_ID]);
  };

  addCustomer(): void {
    this.router.navigate(['customers/add']);
  }; 

}
