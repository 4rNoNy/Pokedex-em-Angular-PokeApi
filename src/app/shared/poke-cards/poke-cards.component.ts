
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
    if (types.length === 1) {
      const typeID = +types[0].type.url.split('type/')[1].replace(/[^0-9]/g, '');
      return `${this._types.pokemonTypes.get(typeID).color}`;
    } else {
      const firstTypeID = +types[0].type.url.split('type/')[1].replace(/[^0-9]/g, '');
      const secondTypeID = +types[1].type.url.split('type/')[1].replace(/[^0-9]/g, '');
      return `linear-gradient(180deg, ${this._types.pokemonTypes.get(firstTypeID).color} 0%,
      ${this._types.pokemonTypes.get(secondTypeID).color} 100%)`;
    }
  }
}
