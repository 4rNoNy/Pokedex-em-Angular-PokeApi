import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ComponentsService } from './components.service';
import { PokemonsStore } from '../stores/pokemon.store';
import { PokemonList } from './../models/pokemon-list.model';
import { Pokemon } from './../models/pokemon.model';
import { Pokemons } from './../models/pokemons.model';
import { environment } from 'src/environments/environment';


import { forkJoin, Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeAPiService {

  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  public length$: Observable<number> = this.lengthSubject.asObservable();
  private connectionSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(navigator.onLine);
  public connection$: Observable<boolean> = this.connectionSubject.asObservable();


  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=896';

  constructor(
    private http: HttpClient,
    private _pokemonStore: PokemonsStore,
    private _components: ComponentsService
  ) {
    window.addEventListener('offline', () => {
      this.connectionSubject.next(false);
    });
    window.addEventListener('online', () => {
      this.connectionSubject.next(true);
    });

  }

  get apiListAllPokemons(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      tap(res => res),
      tap(res => {
        res.results.map((resPokemons: any) => {

          this.apiGetPokemons(resPokemons.url).subscribe(
            res => resPokemons.status = res
          );

        })
      })
    )
  }
  public apiGetPokemons(url: string): Observable<any> {
    return this.http.get<Pokemons>(url).pipe(
      map(
        res => res
      )
    )
  }


  getPokemonList(limit: number = 25, offset: number = 0): Observable<Pokemon[]> {
    // retorno a busca de pokémons
    const getPokemons$ = this.http.get(`${environment.api_url}/pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        tap((res: any) => this.lengthSubject.next(res.count)),
        map((res: PokemonList) => res.results), // map para pegar os resultados
        catchError((error) => {
          console.log('getPokemonList', error);
          this._components.showAlertWithMessage('Algo deu errado! Atualize a página e tente novamente');
          return throwError(error);
        }),
        mergeMap(this.loadPokemonsFromApiOrDB),
        map(this.pokemonListMap)
      );

    return this._components.showLoaderUntilCompleted(getPokemons$);
  }

  /*
    Busca um pokémon por ID   
   */
  getPokemonByID(id: number | string): Observable<Pokemon> {
    return this.http.get(`${environment.api_url}/pokemon/${id}`) as Observable<Pokemon>;
  }
  /*
    Busca um pokémon por nome  
   */
  getPokemonByName(name: string): Observable<Pokemon> {
    const getByName$ = this.http.get(`${environment.api_url}/pokemon/${name}`)
      .pipe(
        catchError((error) => {
          console.log('getPokemonByName', error);
          this._components.showAlertWithMessage(
            error.status === 404 ?
              'Pokémon não encontrado! Verifique se digitou o nome corretamente' :
              'Algo deu errado! Atualize a página e tente novamente'
          );
          return throwError(error);
        }),
      ) as Observable<Pokemon>;
    return this._components.showLoaderUntilCompleted(getByName$);
  }

  /*
    Busca uma lista de pokémons pelo tipo
   */
  getPokemonListByType(type: number): Observable<Pokemon[]> {
    const getByType$ = this.http.get(`${environment.api_url}/type/${type}`)
      .pipe(
        // map para pegar apenas os resultados; Para type tem um objeto a mais dentro
        map((res: any) => res.pokemon.map(p => p.pokemon)),
        catchError((error) => {
          console.log('getPokemonListByType', error);
          this._components.showAlertWithMessage('Algo deu errado! Atualize a página e tente novamente');
          return throwError(error);
        }),
        mergeMap(this.loadPokemonsFromApiOrDB),
        map(this.pokemonListMap)
      );
    return this._components.showLoaderUntilCompleted(getByType$);
  }

  /*
   Metodo que faz o carregamento dos pokémons de duas formas:
  Se está presente no indexedDB, pega do indexedDB
   Se não está presente, então carrega da API
   */
  private loadPokemonsFromApiOrDB = (pokemons: { name: string, url: string }[]): Observable<any> => {
    // pego os pokemons salvos no indexedDB
    const pokemonsDB = this._pokemonStore.getPokemons || {};
    // cria um array 
    const details = pokemons.map(pokemon => {
      // pego o id do pokemon na URL
      const id = pokemon.url.split('pokemon/')[1].replace(/[^0-9]/g, '');
      // se tem o pokemon desse id no storage devolve ele, se não devolve a chamada
      return pokemonsDB[id] ? of(pokemonsDB[id]) : this.getPokemonByID(id);
    });
    // espera todos os observaveis completarem para retornar o array
    return forkJoin(details);
  }



  /*
   Filtra a lista de pokémon pegando apenas os dados importantes para a aplicação
   Só deixo retornar se o pokemon tem foto oficial
   */
  private pokemonListMap = (pokemonList): Pokemon[] => {
    return pokemonList
      .filter(pokemon => {
        return pokemon.sprites.other || pokemon.sprites.official;
      })
      .map(pokemon => ({
        height: pokemon.height,
        id: pokemon.id,
        name: pokemon.name.split('-')[0],
        sprites: {
          front: pokemon.sprites.front ? pokemon.sprites.front : pokemon.sprites.front_default,
          official: pokemon.sprites.official ? pokemon.sprites.official : pokemon.sprites.other['official-artwork'].front_default
        },
        stats: pokemon.stats,
        types: pokemon.types,
        weight: pokemon.weight
      }));
  }

}
