import { SharedModule } from './../../shared/shared.module';
import { DetailsComponent } from './details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DetailsRoutingModule } from './details-routing.module';


@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    SharedModule
  ]
})
export class DetailsPageModule { }
