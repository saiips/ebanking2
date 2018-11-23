import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HappyComponent } from "./happy.component";
import { SadComponent } from "./sad.component";
import { FactoryService } from './factory.service';
import { ExampleComponent } from "./example.component";
import { ServiceRoute } from './_service-based.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild( ServiceRoute )
  ],
  declarations: [
    ExampleComponent,
    HappyComponent,
    SadComponent
  ],
  entryComponents: [
    HappyComponent,
    SadComponent,
  ],
  exports: [
    ExampleComponent,
  ],
  providers: [
    FactoryService,
  ],
})
export class ServiceBasedModule { }