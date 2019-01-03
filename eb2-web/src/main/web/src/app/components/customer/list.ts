import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CustomerServiceV2 } from '../../_services/customer.serviceV2';
import { Customer } from '../../models/customer';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Observable, Subject, of, ReplaySubject } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

declare var require: any;

@Component({
    selector: 'customer-list',
    templateUrl: 'list.html'
})
export class CustomerListComponent implements OnInit, OnDestroy, AfterViewInit {

    customers: Array<Customer> = [];
    // public data$ = new Subject<any>();
    data$: Subject<any> = new ReplaySubject<any>();

    search;

    constructor(private _translateService: TranslateService, private _customerService: CustomerServiceV2, private _changeDetectorRef: ChangeDetectorRef) {
        this._translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.setTranslation(event.lang);
        });
    }


    private setTranslation(lang: string) {
        let i18n = require('./../../../assets/i18n/customer/' + lang + '.json');
        this._translateService.setTranslation(lang, i18n, true);
    }

    public get currentLanguage(): string {
        return this._translateService.currentLang;
    }

    public ngOnInit(): void {
        this.setTranslation(this.currentLanguage);
        this.loadData();
    }

    public ngOnDestroy(): void {
    }

    public ngAfterContentChecked(): void {
    }

    public ngAfterViewInit(): void {
    }

    private loadData(): void {
        this._customerService.getAllCustomers()
            .subscribe(
                (res) => {
                    this.customers = res;
                    this.data$.next(res);
                },
                (err) => {
                    console.log('Error occured');
                },
                () => {
                    console.log('Data obtained');
                    // console.log("customers payload = " + JSON.stringify(this.customers));
                }

            );
    }

    public filter(search: String) {
        if (!search) {
            this.data$.next(this.customers);
        } else {
            this.data$.next(this.customers.filter(_ => _.name.trim().toLowerCase().includes(search.trim().toLowerCase())));
        }
    }

}
