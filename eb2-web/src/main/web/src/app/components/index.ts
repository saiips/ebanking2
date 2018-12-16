import { AppComponent } from './root/app.component';

import { LanguagePickerComponent } from './languagePicker/languagePicker';
import { NavigationComponent } from './navigation/navigation';
import { SideNavigationComponent } from './sideNavigation/sideNavigation';

import { Eb2LoginComponent } from './eb2login/eb2login.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';

import { ProfileComponent } from "./profile/profile.component";

import { CustomerListComponent } from './customer/list';
import { CustomerDetailsComponent } from './customer/details';

export const ALL_COMPONENTS: Array<any> = [
    AppComponent,
    NavigationComponent,
    SideNavigationComponent,
    LanguagePickerComponent,
    Eb2LoginComponent,
    LoginComponent,
    HomeComponent,
    ListComponent,
    ProfileComponent,
    CustomerListComponent,
    CustomerDetailsComponent
];

export const BOOTSTRAP_COMPONENT: any = AppComponent;
