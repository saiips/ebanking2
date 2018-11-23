import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { CommonModule}  from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// i18n translation module
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// 3rd party modules
import { MzButtonModule, MzInputModule, MzSidenavModule } from 'ngx-materialize';
import { DataTableModule } from 'angular-6-datatable';

// App Routing 
import { AppRoutingModule } from './app.routing';

// All Auth Directivies
import { ALL_AUTH_DIRECTIVES } from './directives/index';

// All Components
import { BOOTSTRAP_COMPONENT, ALL_COMPONENTS}  from './components/index';

// All Services
import { ALL_SERVICES }  from './_services/index';

// All Custom PIPES 
import { ALL_PIPES } from './pipes/index';

// All Resolvers
import { ALL_RESOLVERS } from './resolvers/index';

// Constants
import { BROWSER_LANGUAGE } from './constants/index';

// helper / utility functions
import { fakeBackendProvider } from './_helpers';
import { JwtInterceptor, ErrorInterceptor, getBaseUrl } from './_helpers';

let language = navigator.language || navigator['userLanguage'];

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    ...ALL_COMPONENTS,
    ...ALL_PIPES,
    ...ALL_AUTH_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MzButtonModule,
    MzInputModule,
    MzSidenavModule, 
    DataTableModule,   
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ...ALL_SERVICES,
    ...ALL_RESOLVERS,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: 'BASE_URL', useFactory: getBaseUrl, multi: true },
    { provide: BROWSER_LANGUAGE, useValue: language },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [BOOTSTRAP_COMPONENT]
})
export class AppModule { }
