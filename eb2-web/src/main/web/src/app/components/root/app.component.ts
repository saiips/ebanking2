import { Component, Inject } from '@angular/core';
import { BROWSER_LANGUAGE } from '../../constants/index';
import { TranslateService } from '@ngx-translate/core';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EB2';

  constructor(private _translateService: TranslateService, @Inject(BROWSER_LANGUAGE) private _browserLocale: string) { }

  public ngOnInit(): void {
    this._translateService.addLangs(['en-US', 'de-DE', 'zh-HK']);
    this._translateService.setDefaultLang('en-US');
    this._translateService.use(this._browserLocale);
  }

}
