import { Directive, ElementRef, OnInit , Input, HostListener } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { AuthGroup } from '../_guards/auth.types';

@Directive({
    selector: '[myHideIfUnauthorized]'
})
export class MyHideIfUnauthorizedDirective implements OnInit {
    @Input('myHideIfUnauthorized') permission: AuthGroup; // Required permission passed in
    @Input() default: AuthGroup;

    constructor(private el: ElementRef, private authenticationService: AuthenticationService) { }
    
    ngOnInit() {
        console.log("this.permission=" + this.permission);
        console.log("true/false = " + this.authenticationService.hasPermission(this.permission));
        console.log("default=" +this.default);
        if (!this.permission) this.permission = this.default;
        console.log("this.permission=" + this.permission);

        if (!this.authenticationService.hasPermission(this.permission)) {
              this.el.nativeElement.style.display = 'none';
        }
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight('yellow');
      }
     
      @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
      }
     
      private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }    
}