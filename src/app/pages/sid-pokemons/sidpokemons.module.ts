import { SharedModule } from './../../shared/shared.module';
import { SidPokemonsComponent } from './sid-pokemons.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { pokemonsRoutingModule } from './sidPokemons-routing.module';

@NgModule({
  declarations: [
    SidPokemonsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    pokemonsRoutingModule
  ]
})
export class SidPokemonsModule { }
