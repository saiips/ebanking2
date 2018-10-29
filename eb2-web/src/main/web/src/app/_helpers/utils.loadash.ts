import { Injectable } from '@angular/core';
import { isEqual, differenceWith } from 'lodash';
 
@Injectable({ providedIn: 'root' })
export class Utils {
 
    public getChanges(orginalCollection: any, changedCollection: any): any {
        return differenceWith(changedCollection, orginalCollection, isEqual);
    }

    public isEqual(orginalCollection: any, changedCollection: any): any {
        return isEqual(orginalCollection, changedCollection);
    }
}
