(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"2KYh":function(e,t){e.exports='<div class="col-md-6">\n  <h2 class="text-center">Edit User</h2>\n  <div [hidden]="!error">\n    <div class="row-md-6">\n      Error Message: {{errorMessage}}\n    </div>\n  </div>\n  <form [formGroup]="editForm" (ngSubmit)="onSubmit()">\n    <div class="form-group">\n      <label for="PERM_EMAIL">Email address:</label>\n      <input type="email" formControlName="PERM_EMAIL" placeholder="Email" name="PERM_EMAIL" class="form-control" id="PERM_EMAIL" [ngClass]="{ \'is-invalid\': submitted && f.PERM_EMAIL.errors }"/>\n      <div *ngIf="submitted && f.PERM_EMAIL.errors" class="invalid-feedback">\n        <div *ngIf="f.PERM_EMAIL.errors.required">Email is required</div>\n        <div *ngIf="f.PERM_EMAIL.errors.email">Email is invalid</div>\n      </div>      \n    </div>\n\n    <div class="form-group">\n      <label for="FULL_NAME">Full Name:</label>\n      <input formControlName="FULL_NAME" placeholder="First Name" name="FULL_NAME" class="form-control" id="FULL_NAME" [ngClass]="{ \'is-invalid\': submitted && f.FULL_NAME.errors }"/>\n      <div *ngIf="submitted && f.FULL_NAME.errors" class="invalid-feedback">\n        <div *ngIf="f.FULL_NAME.errors.required">Full Name is required</div>\n        <div *ngIf="f.FULL_NAME.errors.minlength">Full Name is invalid</div>\n        <div *ngIf="f.FULL_NAME.errors.maxlength">Full Name is invalid</div>\n      </div>        \n    </div>\n\n    <div class="form-group">\n        <label for="SEX">Sex:</label>\n        \x3c!-- <input formControlName="SEX" placeholder="Sex" name="SEX" class="form-control" id="SEX" [ngClass]="{ \'is-invalid\': submitted && f.SEX.errors }"/> --\x3e\n        <select formControlName="SEX" name="SEX" class="form-control" id="SEX" [ngClass]="{ \'is-invalid\': submitted && f.SEX.errors }">\n          <option *ngFor="let option of options" [value]="option">{{Sex[option]}}</option>\n        </select>\n        <div *ngIf="submitted && f.SEX.errors" class="invalid-feedback">\n          <div *ngIf="f.SEX.errors.required">Sex is required</div>\n        </div>        \n      </div>    \n\n    <div formGroupName="MOBILE" class="form-group">\n        <div class="row-md-6">\n        <h2>Mobile</h2>\n        <label for="MOB_COUNTRY_CODE">Country:</label>\n        <input formControlName="MOB_COUNTRY_CODE" placeholder="Country" name="MOB_COUNTRY_CODE" class="form-control" id="MOB_COUNTRY_CODE" [ngClass]="{ \'is-invalid\': submitted && f[\'MOBILE\'].get[\'MOB_COUNTRY_CODE\'].errors }"/>\n        <div *ngIf="submitted && f[\'MOBILE\'].get[\'MOB_COUNTRY_CODE\'].errors" class="invalid-feedback">\n            <div *ngIf="f[\'MOBILE\'].get[\'MOB_COUNTRY_CODE\'].errors.required">Country is required</div>\n        </div>   \n\n        <label for="MOB_AREA_CODE">Area:</label>\n        <input formControlName="MOB_AREA_CODE" placeholder="Area" name="MOB_AREA_CODE" class="form-control" id="MOB_AREA_CODE" [ngClass]="{ \'is-invalid\': submitted && f[\'MOBILE\'].get[\'MOB_AREA_CODE\'].errors }"/>      \n        <div *ngIf="submitted && f[\'MOBILE\'].get[\'MOB_AREA_CODE\'].errors" class="invalid-feedback">\n            <div *ngIf="f[\'MOBILE\'].get[\'MOB_AREA_CODE\'].errors.required">Area is required</div>\n        </div>   \n\n        <label for="MOB_NUMBER">Mobile Number:</label>\n        <input formControlName="MOB_NUMBER" placeholder="Mobile Number" name="MOB_NUMBER" class="form-control" id="MOB_NUMBER" [ngClass]="{ \'is-invalid\': submitted &&  f[\'MOBILE\'].get[\'MOB_NUMBER\'].errors }"/>\n        <div *ngIf="submitted && f[\'MOBILE\'].get[\'MOB_NUMBER\'].errors" class="invalid-feedback">\n            <div *ngIf="f[\'MOBILE\'].get[\'MOB_NUMBER\'].errors.required">Mobile is required</div>\n            <div *ngIf="f[\'MOBILE\'].get[\'MOB_NUMBER\'].errors.pattern">Mobile is invalid</div>\n        </div>   \n        </div>\n    </div>\n    \n    \x3c!-- Case 1:  form property : dirty, pristence, touched ...etc --\x3e\n    \x3c!-- <button type="submit" class="btn btn-success" [disabled]="!editForm.dirty">Update</button> --\x3e\n    \x3c!-- Case 2:  custom method --\x3e\n    <button type="submit" class="btn btn-success" [disabled]="!isFormChanged()">Update</button>\n    \n    <button type="button" class="btn btn-success" (click)="resetForm()">Reset</button>\n\n    \x3c!-- Case 1:  routerLink --\x3e\n    \x3c!-- <button class="btn btn-primary" [routerLink]="[\'/listCustomer\']">Cancel</button> --\x3e\n    \x3c!-- Case 2:  custom method --\x3e\n    <button class="btn btn-primary" (click)="goBack()">Back</button>\n  </form>\n  \n</div>'},AfXR:function(e,t){e.exports=""},Kq1E:function(e,t){e.exports=""},PPFG:function(e,t,r){"use strict";r.r(t);var o,n=r("CcnG"),i=function(e,t,r,o){var n,i=arguments.length,s=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(i<3?n(s):i>3?n(t,r,s):n(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},s=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},a=function(){function e(){}return e.prototype.transform=function(e,t){var r=e.slice(0,-t),o=e.slice(-t);return r.replace(/./g,"*")+o},e=i([Object(n.Pipe)({name:"phonemask"}),s("design:paramtypes",[])],e)}(),c=function(e,t,r,o){var n,i=arguments.length,s=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(i<3?n(s):i>3?n(t,r,s):n(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},l=function(){function e(){}return e=c([Object(n.NgModule)({imports:[],declarations:[a],exports:[a]})],e)}(),u=r("Ip0R"),d=r("gIcY"),f=r("ZYCi"),m=r("TZGB"),p=r("J9tS"),M=function(e,t,r,o){var n,i=arguments.length,s=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(i<3?n(s):i>3?n(t,r,s):n(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},b=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},h=function(){function e(e,t,r){this.router=e,this.data=t,this.customerService=r}return e.prototype.ngOnInit=function(){this.getListCustomer()},e.prototype.getListCustomer=function(){var e=this;this.customerService.getCustomers().subscribe(function(t){e.customers=t})},e.prototype.deleteCustomer=function(e){var t=this;this.customerService.deleteCustomer(e.CUST_ID).subscribe(function(r){t.customers=t.customers.filter(function(t){return t!==e})})},e.prototype.editCustomer=function(e){this.data.changeMessage(JSON.stringify(e)),this.router.navigate(["customers/"+e.CUST_ID])},e.prototype.addCustomer=function(){this.router.navigate(["customers/add"])},e=M([Object(n.Component)({selector:"app-list-customer",template:r("X9uJ"),styles:[r("knVY")]}),b("design:paramtypes",[f.b,p.d,m.a])],e)}(),E=r("P6uZ"),v=r("XgRA"),g=(function(){}(),function(){}(),function(){return function(){}}());!function(e){e.M="Male",e.F="Female"}(o||(o={}));var O=function(e,t,r,o){var n,i=arguments.length,s=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(i<3?n(s):i>3?n(t,r,s):n(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},_=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},R=function(){function e(e,t,r,n,i,s,a){this.data=e,this.utils=t,this.location=r,this.formBuilder=n,this.route=i,this.router=s,this.customerService=a,this.loading=!1,this.submitted=!1,this.error=!1,this.errorMessage="",this.Sex=o}return e.prototype.ngOnInit=function(){var e=this;this.data.currentMessage.subscribe(function(t){return e.customerString=t});var t=Object.keys(o);this.options=t.slice(0),console.log(t),console.log("================="),console.log(this.options),this.loadForm()},e.prototype.ngAfterViewInit=function(){},e.prototype.loadForm=function(){if(this.customerString&&(console.log("Parameter ...... = "+this.customerString),this.customer=JSON.parse(this.customerString)),!this.customer)return alert("Invalid action"),void this.router.navigate(["customers"]);this.editForm=this.formBuilder.group({CUST_ID:[],FULL_NAME:["",[d.h.required,d.h.minLength(2),d.h.maxLength(50)]],SEX:["",d.h.required],MOBILE:this.formBuilder.group({MOB_COUNTRY_CODE:["",d.h.required],MOB_AREA_CODE:["",d.h.required],MOB_NUMBER:["",[d.h.required,d.h.pattern("^[0-9]*$")]]}),PERM_EMAIL:["",[d.h.required,d.h.email]]},{updateOn:"blur"}),this.formPayload={CUST_ID:this.customer.CUST_ID,FULL_NAME:this.customer.FULL_NAME,SEX:this.customer.SEX,MOBILE:{MOB_COUNTRY_CODE:this.customer.MOB_COUNTRY_CODE,MOB_AREA_CODE:this.customer.MOB_AREA_CODE,MOB_NUMBER:this.customer.MOB_NUMBER},PERM_EMAIL:this.customer.PERM_EMAIL},this.editForm.setValue(this.formPayload)},Object.defineProperty(e.prototype,"f",{get:function(){return this.editForm.controls},enumerable:!0,configurable:!0}),e.prototype.goBack=function(){this.location.back()},e.prototype.isFormChanged=function(){return!this.utils.isEqual(this.formPayload,this.editForm.value)},e.prototype.resetForm=function(){this.editForm.reset(),this.loadForm()},e.prototype.onSubmit=function(){var e=this;this.submitted=!0,this.editForm.invalid||(this.loading=!0,this.customer.FULL_NAME=this.editForm.value.FULL_NAME,this.customer.MOB_NUMBER=this.editForm.value.MOB_NUMBER,this.customer.PERM_EMAIL=this.editForm.value.PERM_EMAIL,this.customer.SEX=this.editForm.value.SEX,this.customerService.updateCustomer(this.customer).pipe(Object(E.a)()).subscribe(function(t){e.router.navigate(["listCustomer"])},function(t){e.error=!0,e.errorMessage=t,e.loading=!1}))},e=O([Object(n.Component)({selector:"app-edit-customer",template:r("2KYh"),styles:[r("AfXR")]}),_("design:paramtypes",[p.d,v.c,u.Location,d.a,f.a,f.b,p.c])],e)}(),L=function(e,t,r,o){var n,i=arguments.length,s=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(i<3?n(s):i>3?n(t,r,s):n(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},C=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},N=function(){function e(e,t,r,o){this.formBuilder=e,this.route=t,this.router=r,this.customerService=o,this.submitted=!1,this.loading=!1,this.error=""}return e.prototype.ngOnInit=function(){this.populateData()},e.prototype.populateData=function(){this.addForm=this.formBuilder.group({CUST_ID:[],FULL_NAME:["",d.h.required],MOB_NUMBER:["",d.h.required],PERM_EMAIL:["",d.h.required]})},Object.defineProperty(e.prototype,"f",{get:function(){return this.addForm.controls},enumerable:!0,configurable:!0}),e.prototype.onSubmit=function(){var e=this;this.submitted=!0,this.addForm.invalid||(this.loading=!0,this.customer=new g,console.log("customer = "+JSON.stringify(this.customer)),this.customer.FULL_NAME=this.addForm.value.FULL_NAME,this.customer.MOB_NUMBER=this.addForm.value.MOB_NUMBER,this.customer.PERM_EMAIL=this.addForm.value.PERM_EMAIL,console.log("customer = "+JSON.stringify(this.customer)),this.customerService.createCustomer(this.customer).pipe(Object(E.a)()).subscribe(function(t){e.router.navigate(["listCustomer"])},function(t){e.error=t,e.loading=!1}))},e=L([Object(n.Component)({selector:"app-add-customer",template:r("qA6a"),styles:[r("Kq1E")]}),C("design:paramtypes",[d.a,f.a,f.b,m.a])],e)}(),B=r("Me/p"),y=[{path:"",component:h},{path:"add",component:N,resolve:{customers:B.a}},{path:":id",component:R,resolve:{customers:B.a}}];r.d(t,"CustomersModule",function(){return I});var A=function(e,t,r,o){var n,i=arguments.length,s=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(i<3?n(s):i>3?n(t,r,s):n(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},I=function(){function e(){}return e=A([Object(n.NgModule)({imports:[u.CommonModule,d.g,l,f.c.forChild(y)],declarations:[h,R,N]})],e)}()},X9uJ:function(e,t){e.exports='<div class="col-md-10">\n  <h2> Customer Details</h2>\n  <button class="btn btn-danger" (click)="addCustomer()"> Add Customer</button>\n  <table class="table table-striped">\n    <thead>\n    <tr>\n      <th class="hidden">Customer ID</th>\n      <th>Full Name</th>\n      <th>Mobile No.</th>\n      <th>Email</th>\n      <th>Version</th>\n      <th>Action</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr *ngFor="let customer of customers">\n      <td class="hidden">{{customer.CUST_ID}}</td>\n      <td>{{customer.FULL_NAME}}</td>\n      <td>{{customer.MOB_NUMBER | phonemask:4 }} </td>\n      <td>{{customer.PERM_EMAIL}}</td>\n      <td>{{customer.VERSION}}</td>\n      <td>\n          <button class="btn btn-danger" (click)="deleteCustomer(customer)"> Delete</button>\n          <button class="btn btn-danger" (click)="editCustomer(customer)" style="margin-left: 30px;"> Edit</button>\n      </td>\n    </tr>\n    </tbody>\n  </table>\n  <p></p>\n  <p><a [routerLink]="[\'/home\']">Home</a></p>\n</div>'},knVY:function(e,t){e.exports=""},qA6a:function(e,t){e.exports='<div class="col-md-6">\n  <h2 class="text-center">Add User</h2>\n  <form [formGroup]="addForm" (ngSubmit)="onSubmit()">\n    <div class="form-group">\n      <label for="PERM_EMAIL">Email address:</label>\n      <input type="email" formControlName="PERM_EMAIL" placeholder="Email" name="PERM_EMAIL" class="form-control" id="PERM_EMAIL" [ngClass]="{ \'is-invalid\': submitted && f.PERM_EMAIL.errors }"/>\n      <div *ngIf="submitted && f.PERM_EMAIL.errors" class="invalid-feedback">\n        <div *ngIf="f.PERM_EMAIL.errors.required">Email is required</div>\n      </div>  \n    </div>\n\n    <div class="form-group">\n      <label for="FULL_NAME">Full Name:</label>\n      <input formControlName="FULL_NAME" placeholder="Full Name" name="FULL_NAME" class="form-control" id="FULL_NAME" [ngClass]="{ \'is-invalid\': submitted && f.FULL_NAME.errors }"/>\n      <div *ngIf="submitted && f.FULL_NAME.errors" class="invalid-feedback">\n        <div *ngIf="f.FULL_NAME.errors.required">Full Name is required</div>\n      </div>   \n    </div>\n\n    <div class="form-group">\n      <label for="MOB_NUMBER">Mobile Number:</label>\n      <input formControlName="MOB_NUMBER" placeholder="Mobile Number" name="MOB_NUMBER" class="form-control" id="MOB_NUMBER" [ngClass]="{ \'is-invalid\': submitted && f.MOB_NUMBER.errors }"/>\n      <div *ngIf="submitted && f.MOB_NUMBER.errors" class="invalid-feedback">\n        <div *ngIf="f.MOB_NUMBER.errors.required">Mobile Number is required</div>\n      </div>  \n    </div>\n\n    <button class="btn btn-success">Add</button>\n    <button class="btn btn-cancel" [routerLink]="[\'/customers\']">Cancel</button>\n  </form>\n</div>'}}]);