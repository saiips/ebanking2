import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
declare var require: any;

@Component({
    selector: 'language-picker',
    template: `<ul id="dropdown-languages" class="dropdown-content">
        <li *ngFor="let language of languages"><a href="" (click)="changeLanguage(language.key)">{{language.caption}}</a></li>
    </ul>`
})
export class LanguagePickerComponent implements OnInit {

    public languages: Array<{ key: string, caption: string }> = [];

    constructor(private _translateService: TranslateService) {
        let i18n = require('./../../../assets/i18n/common/language.json');
        this._translateService.setTranslation(_translateService.getBrowserCultureLang(), i18n, true);
    }

    public changeLanguage(languageKey: string) {
        console.log("languageKey=" + languageKey);
        this._translateService.use(languageKey);
        return false;
    }

    public ngOnInit(): void {
        console.log('LanguagePickerComponent ngOnInit');
        let languageKeys: Array<string> = this._translateService.getLangs();
        if (languageKeys && languageKeys.length) {
            languageKeys.forEach(languageKey => {
                this._translateService
                    .get(`languages.${languageKey}`)
                    .subscribe(languageCaption => this.languages.push({
                        key: languageKey,
                        caption: languageCaption
                    }));
            });
        }
    }

}
