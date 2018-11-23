import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CustomerServiceV2 } from "../../_services/customer.serviceV2";
import { TranslateService } from "@ngx-translate/core";
import { ChangeDetectorRef } from "@angular/core";
import { CustomerListComponent } from "./list";

describe("CustomerListComponent", () => {
    let comp: CustomerListComponent;
    let fixture: ComponentFixture<CustomerListComponent>;

    beforeEach(() => {
        const customerServiceV2Stub = {
            getAllCustomers: () => ({
                subscribe: () => ({})
            })
        };
        const translateServiceStub = {};
        const changeDetectorRefStub = {};
        TestBed.configureTestingModule({
            declarations: [ CustomerListComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: CustomerServiceV2, useValue: customerServiceV2Stub },
                { provide: TranslateService, useValue: translateServiceStub },
                { provide: ChangeDetectorRef, useValue: changeDetectorRefStub }
            ]
        });
        fixture = TestBed.createComponent(CustomerListComponent);
        comp = fixture.componentInstance;
    });

    it("can load instance", () => {
        expect(comp).toBeTruthy();
    });

    it("customers defaults to: []", () => {
        expect(comp.customers).toEqual([]);
    });

});
