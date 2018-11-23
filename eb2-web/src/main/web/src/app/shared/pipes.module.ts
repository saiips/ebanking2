import { DynamicPhoneMaskPipe } from './../pipes/dynamicPhoneMaskPipe';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    DynamicPhoneMaskPipe,
  ],
  exports: [
    DynamicPhoneMaskPipe,
  ]
})
export class SharedPipesModule {}