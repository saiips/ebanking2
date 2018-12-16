
import { Component, OnInit, AfterViewInit, ViewEncapsulation  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_services';
import { ScriptLoaderService } from '../../_services/index';

// Declare JQuery
declare let $: any;

// Declare Function from app.js
declare function gotoStepFunc(any): any;

// encapsulation: ViewEncapsulation.None

@Component({
  selector: 'app-eb2login',
  templateUrl: './eb2login.component.html',
  styleUrls: ['./eb2login.component.css'],
})
export class Eb2LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';  

  constructor(
    private _script: ScriptLoaderService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });    

    // reset login status
    this.authenticationService.logout();    

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';    

  
  }

  ngAfterViewInit() {
    
      $(document).ready(() => {
          $('body').addClass('body--ebanking'); 
          // load external javascript
          // this.loadScript('./assets/js/plugin.js');
          // this.loadScript('./assets/js/app.js');
          // this.loadScript('./assets/js/index.js');
      });

      
    this._script.loadScripts('body', [
        './assets/js/index.js'
    ]);  
  }

  public loadScript(url) {
    console.log('preparing to load...');
    let node = document.createElement('script');
    node.src = url;
    node.defer = true;
    document.getElementsByTagName('head')[0].appendChild(node);
 }  


  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
    
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    // this.router.navigate([this.returnUrl]);
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
  }

  public gotoStepFunc(data) {
    console.log("call javascript function gotoStepFunc");
    gotoStepFunc(data);
  }
  
}
