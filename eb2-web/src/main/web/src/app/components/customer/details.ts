import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Location} from '@angular/common';
import {CustomerServiceV2} from '../../_services/customer.serviceV2';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Customer} from '../../models/customer';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';


// Alternative 1: 
//import * as $ from 'jquery';

// Alternative 2:
declare let $: any;

// declare var Materialize: any;

declare var require: any;

@Component({
    selector: 'customer-details',
    templateUrl: 'details.html'
})
export class CustomerDetailsComponent implements OnInit, AfterViewInit {

    public customer: FormGroup;

    constructor(private _router: Router,
        private _location: Location,
        private _route: ActivatedRoute,
        private _customerService: CustomerServiceV2,
        private _translateService: TranslateService) {

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

        this._route.data
            .subscribe((data: { customer: Customer }) => {
                this.customer = new FormGroup({
                    name: new FormControl(data.customer.name, [Validators.required, Validators.minLength(3)]),
                    country: new FormControl(data.customer.country),
                    countryCode: new FormControl(data.customer.countryCode),
                    city: new FormControl(data.customer.city),
                    phone: new FormControl(data.customer.phone),
                    id: new FormControl(data.customer.id)
                });
            });

    }

    public ngAfterViewInit(): void {
        $(document).ready(() => {
               // to Materialize.updateFields();
                $( '.input-field > input' ).each( ( index, el ) => {
                    // if ( $(el).val() !== '' )
                        $(el).trigger( 'focus' );
                } );  
            }
        )
    }

    public navigateBack(): void {
        this._location.back();
    }

    public deleteCustomer(id: number): void{
        this._customerService.deleteCustomerById(id)
            .subscribe(()=> this._location.back());
    }

    public saveCustomer(value: Customer): void {
        let observable = null;
        if (value.id) {
            observable = this._customerService.addCustomer(<Customer>value);
        } else {
            observable = this._customerService.updateCustomer(<Customer> value);
        }
        observable.subscribe(
            result => this._router.navigate([`/customer`])
        );
    }
}
