import { 
    Injectable,
    ComponentFactoryResolver,
    ComponentFactory,
    ViewContainerRef,
  } from '@angular/core';
  import { HappyComponent } from "./happy.component";
  import { SadComponent } from "./sad.component";
  
  @Injectable()
  export class FactoryService {
    rootViewContainer: ViewContainerRef;
  
    constructor(private factoryResolver: ComponentFactoryResolver) { }
  
    setRootViewContainerRef(view: ViewContainerRef): void {
      this.rootViewContainer = view;
    }
  
    reset(): void {
      this.rootViewContainer.clear();
    }
  
    insertHappyComponent(): void {
      this.insertComponent(HappyComponent);
    }
  
    insertSadComponent(): void {
      this.insertComponent(SadComponent);
    }
  
    private insertComponent(componentType): void {
      const factory = this.factoryResolver.resolveComponentFactory(componentType);
      this.rootViewContainer.createComponent(factory);
    }
  }