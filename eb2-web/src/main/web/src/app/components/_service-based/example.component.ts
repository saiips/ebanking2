import { 
    Component, 
    OnInit,
    ViewChild,
    ViewContainerRef,
  } from '@angular/core';
  import { FactoryService } from "./factory.service";
  
  @Component({
    selector: 'service-based-factory',
    template: `
      <div>Factory Service Example</div>
      
      <div>
        <button (click)="happy()">Happy</button>
        <button (click)="sad()">Sad</button>
      </div>
  
      <ng-container #dynamic></ng-container>

      <div class="container">
      <p><a [routerLink]="['/home']">Home</a></p>
      </div>
    `,
  })
  export class ExampleComponent implements OnInit { 
    @ViewChild("dynamic", { read: ViewContainerRef }) view: ViewContainerRef;
  
    constructor(private service: FactoryService) { }
  
    ngOnInit() {
      this.service.setRootViewContainerRef(this.view);
    }
  
    happy(): void {
      this.service.reset();
      this.service.insertHappyComponent();
    }
  
    sad(): void {
      this.service.reset();
      this.service.insertSadComponent();
    }
  }
  