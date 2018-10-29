import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }    from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ListCustomerComponent } from './list-customer.component';
import { EditCustomerComponent } from './edit-customer.component';
import { AddCustomerComponent } from './add-customer.component';
import { customersRoute } from './customers.routing';

@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule.forChild(customersRoute)
    ],
    declarations: [
        ListCustomerComponent, 
        EditCustomerComponent, 
        AddCustomerComponent
    ],
  })
 export class CustomersModule { }