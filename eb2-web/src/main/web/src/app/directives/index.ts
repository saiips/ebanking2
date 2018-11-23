import { MyHideIfUnauthorizedDirective } from './hide-if-unauthorized.directive';
import { MyDisableIfUnauthorizedDirective } from './disable-if-unauthorized.directive';

export const ALL_AUTH_DIRECTIVES: Array<any> = [
    MyHideIfUnauthorizedDirective,
    MyDisableIfUnauthorizedDirective
];