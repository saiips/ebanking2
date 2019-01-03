import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

declare var require: any;
@Component({
    selector: 'side-navigation',
    templateUrl: 'sideNavigation.html'
})
export class SideNavigationComponent implements OnInit {
    ngOnInit(): void {
        this.setTranslation(this._translateService.currentLang);
    }

    constructor(private _translateService: TranslateService) {
        this._translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.setTranslation(event.lang);
        });
    }

    private setTranslation(lang: string) {
        let i18n = require('./../../../assets/i18n/sideNavigation/' + lang + '.json');
        this._translateService.setTranslation(lang, i18n, true);
    }

}
