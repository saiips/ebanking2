import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phonemask'
})
export class DynamicPhoneMaskPipe implements PipeTransform {

    constructor() { }

    public transform(value: string, visibleDigits: number): string {
        //const visibleDigits = 4;
        let maskedSection = value.slice(0, -visibleDigits);
        let visibleSection = value.slice(-visibleDigits);
        return maskedSection.replace(/./g, '*') + visibleSection;
      }

}
