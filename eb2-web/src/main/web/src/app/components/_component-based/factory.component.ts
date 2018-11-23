import { 
    Component, 
    Input, 
    OnChanges, 
    ViewChild, 
    ViewContainerRef, 
    ComponentFactoryResolver 
  } from '@angular/core';
  import { GreenComponent } from "./green.component";
  import { RedComponent } from "./red.component";
    
  @Component({
    selector: 'app-factory',
    template: `
      <ng-container #dynamic></ng-container>
    `,
  })
  export class FactoryComponent implements OnChanges {
    @Input() type = "";
    @ViewChild("dynamic", {read: ViewContainerRef}) component: ViewContainerRef;
  
  
    constructor(private componentFactory: ComponentFactoryResolver) { }
  
    ngOnChanges() {
      this.destroy();
      this.create();
    }
  
  
    private destroy(): void {
      this.component.clear();
    }
  
    private create(): void {
      const componentType = this.getType();
  
      if (componentType != null) {
        const factory = this.componentFactory.resolveComponentFactory(componentType);
        const componentRef = this.component.createComponent(factory);
      }
    }
  
    private getType() {
      switch (this.type) {
        case "green": 
          return GreenComponent;
        case "red": 
          return RedComponent;
      }
    }
  }