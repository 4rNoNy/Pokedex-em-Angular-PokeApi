import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class TypesService {


  /*
    Lista com tipos de pokémon para serem usados na pokedex
   */
  public pokemonTypes: Map<number, { name: string, color: string, contrast: string, img: string }> = new Map([
    [1, { name: 'Normal', color: '#A0A29F', contrast: '#FFFFFF', img: 'assets/type-icons/png/normal.png' }],
    [2, { name: 'Lutador', color: '#D3425F', contrast: '#FFFFFF', img: 'assets/type-icons/png/fighting.png' }],
    [3, { name: 'Voador', color: '#A1BBEC', contrast: '#FFFFFF', img: 'assets/type-icons/png/flying.png' }],
    [4, { name: 'Veneno', color: '#B763CF', contrast: '#FFFFFF', img: 'assets/type-icons/png/poison.png' }],
    [5, { name: 'Terra', color: '#DA7C4D', contrast: '#FFFFFF', img: 'assets/type-icons/png/ground.png' }],
    [6, { name: 'Rocha', color: '#C9BB8A', contrast: '#FFFFFF', img: 'assets/type-icons/png/rock.png' }],
    [7, { name: 'Inseto', color: '#92BC2C', contrast: '#FFFFFF', img: 'assets/type-icons/png/bug.png' }],
    [8, { name: 'Fantasma', color: '#5F6DBC', contrast: '#FFFFFF', img: 'assets/type-icons/png/ghost.png' }],
    [9, { name: 'Metálico', color: '#5695A3', contrast: '#FFFFFF', img: 'assets/type-icons/png/steel.png' }],
    [10, { name: 'Fogo', color: '#FBA54C', contrast: '#FFFFFF', img: 'assets/type-icons/png/fire.png' }],
    [11, { name: 'Água', color: '#539DDF', contrast: '#FFFFFF', img: 'assets/type-icons/png/water.png' }],
    [12, { name: 'Grama', color: '#5FBD58', contrast: '#FFFFFF', img: 'assets/type-icons/png/grass.png' }],
    [13, { name: 'Elétrico', color: '#F2D94E', contrast: '#FFFFFF', img: 'assets/type-icons/png/electric.png' }],
    [14, { name: 'Psíquico', color: '#FA8581', contrast: '#FFFFFF', img: 'assets/type-icons/png/psychic.png' }],
    [15, { name: 'Gelo', color: '#75D0C1', contrast: '#FFFFFF', img: 'assets/type-icons/png/ice.png' }],
    [16, { name: 'Dragão', color: '#0C69C8', contrast: '#FFFFFF', img: 'assets/type-icons/png/dragon.png' }],
    [17, { name: 'Noturno', color: '#595761', contrast: '#FFFFFF', img: 'assets/type-icons/png/dark.png' }],
    [18, { name: 'Fada', color: '#EE90E6', contrast: '#FFFFFF', img: 'assets/type-icons/png/fairy.png' }]
  ]);

}
