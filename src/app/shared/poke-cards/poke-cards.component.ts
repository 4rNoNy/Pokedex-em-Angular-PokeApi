
import { TypesService } from './../../service/types.service';
import { Pokemon } from './../../models/pokemon.model';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'pokecards',
  templateUrl: './poke-cards.component.html',
  styleUrls: ['./poke-cards.component.scss']
})
export class PokeCardsComponent implements OnInit {


  @Input() pokemon: Pokemon;

  public number: string;



  constructor(
    private _types: TypesService

  ) { }


  ngOnInit(): void {
    this.number = String(this.pokemon.id).padStart(3, '0');
  }
  /*
   gera o background do card 
   */
  generateCardBackground(types): string {

    const typeID = +types[0].type.url.split('type/')[1].replace(/[^0-9]/g, '');
    return `${this._types.pokemonTypes.get(typeID).color}`;

  }
}
