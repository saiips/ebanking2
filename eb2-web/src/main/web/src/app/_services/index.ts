export * from './authentication.service';
export * from './customer.service';
export * from './customer.serviceV2';
export * from './data.service';
export * from './user.service';
export * from './script-loader.service';
export * from './crypto.service';

import { AuthenticationService } from './authentication.service';
import { AuthorizationDataService } from './authorization-data.service';
import { CustomerService } from './customer.service';
import { CustomerServiceV2 } from './customer.serviceV2';
import { DataService } from './data.service';
import { UserService } from './user.service';
import { ScriptLoaderService } from './script-loader.service';
import { CryptoService}  from './crypto.service';

export const ALL_SERVICES: Array<any> = [
    AuthenticationService,
    AuthorizationDataService,
    CustomerService,
    CustomerServiceV2,
    DataService,
    UserService,
    ScriptLoaderService,
    CryptoService
];