import { Routes } from '@angular/router';

import { ListCustomerComponent } from './list-customer.component';
import { EditCustomerComponent } from './edit-customer.component';
import { AddCustomerComponent } from './add-customer.component';
import { CustomersResolver } from '../../resolvers/customersResolver';

export const customersRoute: Routes = [
  { path: '', component: ListCustomerComponent },
  { path: 'add', component: AddCustomerComponent, resolve: {customers: CustomersResolver} },
  { path: ':id', component: EditCustomerComponent, resolve: {customers: CustomersResolver} },
];

