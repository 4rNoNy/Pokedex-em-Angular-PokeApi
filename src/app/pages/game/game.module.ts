import { GameComponent } from './game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';


@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GameRoutingModule,
    SharedModule
  ]
})
export class GamePageModule { }
