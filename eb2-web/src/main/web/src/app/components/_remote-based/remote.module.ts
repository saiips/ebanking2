import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RemoteComponent } from './remote.component';
import { AddonService } from './addon.service';
import { RemoteRoute } from './remote.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RemoteRoute)
  ],
  declarations: [
    RemoteComponent
  ],  
  providers: [ AddonService ]
})
export class RemoteModule { }
