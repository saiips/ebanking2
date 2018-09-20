import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { ListComponent } from './list';
import { CustomersComponent } from './customers';
// import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent,  pathMatch: 'full' },
    { path: 'login', component: LoginComponent,  pathMatch: 'full' },
    { path: 'list', component: ListComponent,  pathMatch: 'full'},
    { path: 'customers', component: CustomersComponent,  pathMatch: 'full'},
    

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}