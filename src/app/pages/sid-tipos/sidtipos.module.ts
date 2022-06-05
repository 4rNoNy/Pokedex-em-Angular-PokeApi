import { SharedModule } from '../../shared/shared.module';
import { SidTiposComponent } from './sid-tipos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { tiposRoutingModule } from './sidtipos-routing.module';

@NgModule({
  declarations: [
    SidTiposComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    tiposRoutingModule
  ]
})
export class SidTiposModule { }
