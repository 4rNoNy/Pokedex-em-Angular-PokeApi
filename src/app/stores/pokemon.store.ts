import { Pokemon } from '../models/pokemon.model';
import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';


@Injectable({
  providedIn: 'root'
})
export class PokemonsStore {

  /*
 comunicação e disparar novos cursos 
   */
  private pokemonsDB: { [key: string]: Pokemon } = {};

  /*
    Construtor da classe 
   */
  constructor(
    private dbService: NgxIndexedDBService
  ) { }

  /*
    Inicializa o store buscando no IndexedDB
   */
  initializeStore(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.dbService.getAll('pokemon').subscribe(async pokemonDB => {
        (await pokemonDB).forEach(pokemon => {
          this.pokemonsDB[pokemon.id] = pokemon;
        });
        resolve();
      });
    });
  }

  /*
    retorna os pokémons que estão no DB
   */
  get getPokemons(): { [key: string]: Pokemon } {
    return this.pokemonsDB;
  }

  /*
    Atualiza os pokemons no DB e store
   */
  set setPokemons(pokemonList: Pokemon[]) {

    pokemonList
      .filter(pokemon => !this.pokemonsDB[pokemon.id])
      .forEach(pokemon => {
        // atribuir no store o pokémon para seu id
        this.pokemonsDB[pokemon.id] = pokemon;
        // salva no indexedDB
        this.dbService.add('pokemon', pokemon, pokemon.id);
      });
  }

}
