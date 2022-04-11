
import { TypesService } from './../../service/types.service';
import { Pokemon } from './../../models/pokemon.model';
import { Component, Input, OnInit } from '@angular/core';


/**
 * Componente para exibir os dados de um pokémon em formato de card. Utilizado
 * na home da aplicação
 */
@Component({
  selector: 'pokecards',
  templateUrl: './poke-cards.component.html',
  styleUrls: ['./poke-cards.component.scss']
})
export class PokeCardsComponent implements OnInit {

  /**
   * Dados do pokémon para serem exibidos
   */
  @Input() pokemon: Pokemon;

  public number: string;


  constructor(
    private _types: TypesService

  ) { }

  /**
   * Ao inicializar pela o numero do pokémon da forma que é exibida oficialmente
   */
  ngOnInit(): void {
    this.number = String(this.pokemon.id).padStart(3, '0');
  }
  /**
   * Vai gerar a string do background do card dependendo de quantos tipos o pokémon tem;
   * - Se tem um tipo só, retorna o hexadecimal com um pouco de alpha no final para transparecia
   * - Se tem mais de 1 tipo, então retorna o gradiente
   * @param types o array de tipos do pokémon
   */
  generateCardBackground(types): string {
    if (types.length === 1) {
      const typeID = +types[0].type.url.split('type/')[1].replace(/[^0-9]/g, '');
      return `${this._types.pokemonTypes.get(typeID).color}e3`;
    } else {
      const firstTypeID = +types[0].type.url.split('type/')[1].replace(/[^0-9]/g, '');
      const secondTypeID = +types[1].type.url.split('type/')[1].replace(/[^0-9]/g, '');
      return `linear-gradient(130deg, ${this._types.pokemonTypes.get(firstTypeID).color} 0%,
      ${this._types.pokemonTypes.get(secondTypeID).color} 100%)`;
    }
  }
  borderCard(types): string {
    const typeID = +types[0].type.url.split('type/')[1].replace(/[^0-9]/g, '');
    return ` 2px solid ${this._types.pokemonTypes.get(typeID).color}e3`;
  }

}