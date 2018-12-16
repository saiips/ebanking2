import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'number'
})
export class DynamicDecimalPipe implements PipeTransform {

    constructor(private _translateService: TranslateService) {

    }

    public transform(value: any, digits: string = null): any {
        let ngPipe;
        if (this._translateService.currentLang != "en-US") {
            ngPipe = new DecimalPipe("en-US");
        } else {
            ngPipe = new DecimalPipe(this._translateService.currentLang);
        }   
        return ngPipe.transform(value, digits);
    }

}
