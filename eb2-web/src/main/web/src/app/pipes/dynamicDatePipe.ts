import { DatePipe}  from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'date'
})
export class DynamicDatePipe implements PipeTransform {

    constructor(private _translateService: TranslateService) {

    }

    public transform(value: any, pattern: string = 'mediumDate'): any {
        let ngPipe;
        if (this._translateService.currentLang == "zh-HK") {
            ngPipe = new DatePipe("en-US");
            
        } else {
            ngPipe = new DatePipe(this._translateService.currentLang);
        }
        return ngPipe.transform(value, pattern);
    }

}
