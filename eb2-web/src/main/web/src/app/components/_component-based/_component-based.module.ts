import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ExampleComponent } from './example.component';
import { RedComponent } from './red.component';
import { GreenComponent } from './green.component';
import { FactoryComponent } from './factory.component';

import { ComponentRoute } from './_component-based.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentRoute)
  ],
  declarations: [
    ExampleComponent, 
    RedComponent, 
    GreenComponent, 
    FactoryComponent
  ],
  entryComponents: [
    RedComponent,
    GreenComponent
  ],
  exports: [
    ExampleComponent
  ],
})
export class ComponentBasedModule { }