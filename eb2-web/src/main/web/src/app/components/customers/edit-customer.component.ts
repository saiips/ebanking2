import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Customer } from '../../_models/customer';
import { CustomerService, DataService } from '../../_services';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, SelectMultipleControlValueAccessor } from "@angular/forms";
import { first } from "rxjs/operators";
import { Location } from '@angular/common';
import { strictEqual } from 'assert';
import { Utils } from "../../_helpers";
import { Sex } from '../../_models';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit, AfterViewInit {

  customerString: string;
  formPayload;
  customer: Customer;
  editForm: FormGroup;
  queryParam: String;
  loading = false;
  submitted = false;
  error = false;
  errorMessage = '';
  options: string[];
  Sex: typeof Sex = Sex;

  constructor(private data: DataService, private utils: Utils, private location: Location, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private customerService: CustomerService) { }

  ngOnInit() {
    // Alternative 1: pass parameter as a query string
    // let customerString = this.route.snapshot.queryParams['editCustomer'];

    // Alternative 2: Shared with DataService
    this.data.currentMessage.subscribe(message => this.customerString = message)

    var options = Object.keys(Sex);
    this.options = options.slice(0);

    console.log(options);
    console.log("=================");
    console.log(this.options);

    this.loadForm();
  }

  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
  }  

  loadForm() : void {
    if (this.customerString) {
      console.log("Parameter ...... = " + this.customerString);
      this.customer = JSON.parse(this.customerString);
    }

    if (!this.customer) {
      alert("Invalid action");
      this.router.navigate(['customers']);
      return;
    }

    this.editForm = this.formBuilder.group({
      CUST_ID: [],
      FULL_NAME: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      SEX: ['',Validators.required],
      MOBILE: this.formBuilder.group({
        MOB_COUNTRY_CODE: ['', Validators.required],
        MOB_AREA_CODE: ['', Validators.required],
        MOB_NUMBER: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]}),
      PERM_EMAIL: ['', [Validators.required, Validators.email]]
    }, {updateOn: 'blur'} );   
    // append this property on fromBuilder to prompt error if validators.error matched
    // {updateOn: 'blur'}
    
    this.formPayload = { 
      CUST_ID: this.customer.CUST_ID, 
      FULL_NAME: this.customer.FULL_NAME, 
      SEX: this.customer.SEX, 
      MOBILE: {
                MOB_COUNTRY_CODE: this.customer.MOB_COUNTRY_CODE,
                MOB_AREA_CODE: this.customer.MOB_AREA_CODE,
                MOB_NUMBER: this.customer.MOB_NUMBER 
              },
      PERM_EMAIL: this.customer.PERM_EMAIL
    };
    // this.editForm.setValue(this.customer);
    this.editForm.setValue (this.formPayload);
  };


  // better operation on html
  get f() { return this.editForm.controls; }

  goBack(): void {
    this.location.back();
  }
  
  // custom method to detect form data changed
  isFormChanged() {
    var isChanged = !(this.utils.isEqual(this.formPayload, this.editForm.value));
    return isChanged;
  }


  resetForm() {
    this.editForm.reset();
    this.loadForm();
  }


  onSubmit() {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }

    this.loading = true;


    this.customer.FULL_NAME = this.editForm.value.FULL_NAME;
    this.customer.MOB_NUMBER = this.editForm.value.MOB_NUMBER;
    this.customer.PERM_EMAIL = this.editForm.value.PERM_EMAIL;
    this.customer.SEX = this.editForm.value.SEX;
    // this.editForm.value

    this.customerService.updateCustomer(this.customer)
      .pipe(first())
      .subscribe(
        response => {
          this.router.navigate(['listCustomer']);
        },
        error => {
          this.error = true;
          this.errorMessage = error;
          this.loading = false;
        });    
  }

}
