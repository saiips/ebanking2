import { Component, OnInit } from '@angular/core';
import { Customer } from '../../_models/customer';
import { CustomerService } from '../../_services/customer.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  customer: Customer;
  addForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private customerService: CustomerService) { }

  ngOnInit() {
    this.populateData();
  }

  populateData(): void {
    this.addForm = this.formBuilder.group({
      CUST_ID: [],
      FULL_NAME: ['', Validators.required],
      MOB_NUMBER: ['', Validators.required],
      PERM_EMAIL: ['', Validators.required]
    });
  }

  get f() { return this.addForm.controls; }  

  onSubmit() {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }

    this.loading = true;

    this.customer = new Customer();
    console.log("customer = " + JSON.stringify(this.customer));
    
    this.customer.FULL_NAME = this.addForm.value.FULL_NAME;
    this.customer.MOB_NUMBER = this.addForm.value.MOB_NUMBER;
    this.customer.PERM_EMAIL = this.addForm.value.PERM_EMAIL;
    // this.editForm.value    

    console.log("customer = " + JSON.stringify(this.customer));

    this.customerService.createCustomer(this.customer)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['listCustomer']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });    
  }  

}
