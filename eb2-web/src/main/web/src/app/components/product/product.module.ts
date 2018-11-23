import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product';
import { StockStatusComponent } from './stockstatus';
import { Routes, RouterModule } from '@angular/router';

import { ProductRoute } from './product.routing';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild(ProductRoute)      

    ],
    declarations: [
        ProductComponent,
        StockStatusComponent

    ],
  })
 export class ProductModule { }