import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Location } from "@angular/common";
import { CustomerServiceV2 } from "../../_services/customer.serviceV2";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Customer } from "../../models/customer";
import { TranslateService } from "@ngx-translate/core";
import { CustomerDetailsComponent } from "./details";

describe("CustomerDetailsComponent", () => {
    let comp: CustomerDetailsComponent;
    let fixture: ComponentFixture<CustomerDetailsComponent>;

    beforeEach(() => {
        const locationStub = {
            back: () => ({})
        };
        const customerServiceV2Stub = {
            deleteCustomerById: () => ({
                subscribe: () => ({})
            }),
            addCustomer: () => ({}),
            updateCustomer: () => ({})
        };
        const routerStub = {
            navigate: () => ({})
        };
        const activatedRouteStub = {
            data: {
                subscribe: () => ({})
            }
        };
        const customerStub = {
            id: {}
        };
        const translateServiceStub = {};
        TestBed.configureTestingModule({
            declarations: [ CustomerDetailsComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: Location, useValue: locationStub },
                { provide: CustomerServiceV2, useValue: customerServiceV2Stub },
                { provide: Router, useValue: routerStub },
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: Customer, useValue: customerStub },
                { provide: TranslateService, useValue: translateServiceStub }
            ]
        });
        fixture = TestBed.createComponent(CustomerDetailsComponent);
        comp = fixture.componentInstance;
    });

    it("can load instance", () => {
        expect(comp).toBeTruthy();
    });

    describe("saveCustomer", () => {
        it("makes expected calls", () => {
            const customerServiceV2Stub: CustomerServiceV2 = fixture.debugElement.injector.get(CustomerServiceV2);
            const routerStub: Router = fixture.debugElement.injector.get(Router);
            spyOn(customerServiceV2Stub, "addCustomer");
            spyOn(customerServiceV2Stub, "updateCustomer");
            spyOn(routerStub, "navigate");
            comp.saveCustomer(customerStub);
            expect(customerServiceV2Stub.addCustomer).toHaveBeenCalled();
            expect(customerServiceV2Stub.updateCustomer).toHaveBeenCalled();
            expect(routerStub.navigate).toHaveBeenCalled();
        });
    });

    describe("navigateBack", () => {
        it("makes expected calls", () => {
            const locationStub: Location = fixture.debugElement.injector.get(Location);
            spyOn(locationStub, "back");
            comp.navigateBack();
            expect(locationStub.back).toHaveBeenCalled();
        });
    });

});
