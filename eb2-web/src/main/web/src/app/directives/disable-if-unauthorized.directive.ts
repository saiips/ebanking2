import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { AuthGroup } from '../_guards/auth.types';

@Directive({
    selector: '[myDisableIfUnauthorized]'
})
export class MyDisableIfUnauthorizedDirective implements OnInit {
    @Input('myDisableIfUnauthorized') permission: AuthGroup; // Required permission passed in
    
    constructor(private el: ElementRef, private authenticationService: AuthenticationService) { }
    
    ngOnInit() {
        if (!this.authenticationService.hasPermission(this.permission)) {
              this.el.nativeElement.disabled = true;
        }
    }
}