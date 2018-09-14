import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { ListComponent } from './list';
// import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent,  pathMatch: 'full' },
    { path: 'login', component: LoginComponent,  pathMatch: 'full' },
    { path: 'list', component: ListComponent,  pathMatch: 'full'},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);