import { Resolve } from '@angular/router';
import { CustomerResolver } from './customerResolver';
import { CustomersResolver } from './customersResolver';

export const ALL_RESOLVERS: Array<any> = [
    CustomerResolver,
    CustomersResolver
];
