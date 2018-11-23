import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ListComponent } from './components/list/list.component';

import { ProfileComponent } from "./components/profile/profile.component";

import { CustomerListComponent } from './components/customer/list';
import { CustomerDetailsComponent } from './components/customer/details';
import { CustomerResolver } from './resolvers/customerResolver';


import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // demo for stanard page navigation
    { path: 'login', component: LoginComponent },
    { path: 'list', component: ListComponent },
    { path: 'home', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },

    // demo for lazy loading module 
    { path: 'customers', loadChildren: './components/customers/customers.module#CustomersModule' },
    { path: 'product', loadChildren: './components/product/product.module#ProductModule' },
    { path: 'component', loadChildren: './components/_component-based/_component-based.module#ComponentBasedModule' },
    { path: 'service', loadChildren: './components/_service-based/_service-based.module#ServiceBasedModule' },
    { path: 'remote', loadChildren: './components/_remote-based/remote.module#RemoteModule' },

    // demo for a custom resolver
    { path: 'customer', component: CustomerListComponent },
    { path: 'customer/add', component: CustomerDetailsComponent, resolve: { customer: CustomerResolver} },
    { path: 'customer/:id', component: CustomerDetailsComponent, resolve: { customer: CustomerResolver} },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}