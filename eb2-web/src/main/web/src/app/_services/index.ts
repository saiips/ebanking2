export * from './authentication.service';
export * from './customer.service';
export * from './customer.serviceV2';
export * from './data.service';
export * from './user.service';

import { AuthenticationService } from './authentication.service';
import { AuthorizationDataService } from './authorization-data.service';
import { CustomerService } from './customer.service';
import { CustomerServiceV2 } from './customer.serviceV2';
import { DataService } from './data.service';
import { UserService } from './user.service';

export const ALL_SERVICES: Array<any> = [
    AuthenticationService,
    AuthorizationDataService,
    CustomerService,
    CustomerServiceV2,
    DataService,
    UserService
];