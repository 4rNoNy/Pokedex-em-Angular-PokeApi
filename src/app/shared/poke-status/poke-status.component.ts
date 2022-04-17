import { TypesService } from './../../service/types.service';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-poke-status',
  templateUrl: './poke-status.component.html',
  styleUrls: ['./poke-status.component.scss']
})
export class PokeStatusComponent {

  @Input() status;

  /*
  Usei apenas para traduzir os nomes
   */
  public statusNames: Map<string, { name: string, color: string }> = new Map([
    ['hp', { name: 'Vida', color: 'pokemonTypes.color' }],
    ['attack', { name: 'Ataque', color: '#F5AC78' }],
    ['defense', { name: 'Defesa', color: '#FAE078' }],
    ['special-attack', { name: 'Ataque SP', color: '#6890F0' }],
    ['special-defense', { name: 'Defesa SP', color: '#78C850' }],
    ['speed', { name: 'Velocidade', color: '#FA92B2' }]
  ]);

  constructor(
    private _types: TypesService

  ) { }
  ngOnInit(): void {
  }


  colorPokemon(types): string {
    const typeID = +types[0].type.url.split('type/')[1].replace(/[^0-9]/g, '');
    return ` ${this._types.pokemonTypes.get(typeID).color}e3`;
  }

}

