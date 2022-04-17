import { PokemonsStore } from './../../stores/pokemon.store';
import { PokeAPiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { TypesService } from './../../service/types.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ngForAnimation } from 'src/assets/animations/animations';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ngForAnimation]
})
export class HomeComponent implements OnInit {

  public viewList = 'Pokémon';
  public length$: Observable<number>;
  public limit = 25;
  public limitOptions = [10, 25, 50];
  public pokemonsPaginated: Partial<Pokemon>[];
  public pokemonsByType: Partial<Pokemon>[];
  public types: {
    name: string;
    color: string;
    contrast: string;
  }[];


  constructor(
    public _pokedex: PokeAPiService,
    private _pokemonsStore: PokemonsStore,
    private _types: TypesService,
    private _router: Router,
    private route: ActivatedRoute
  ) {

  }

  /*
    Ao iniciar vai buscar os dados dos pokémons.
    o metodo getPokemonList faz uma junção de pokémons que estão salvos no indexedDB e
    pokémons que devem ser pegos na API e
    depois salva os novos pokémons no indexedDB
   */
  async ngOnInit(): Promise<void> {
    await this._pokemonsStore.initializeStore();
    this.length$ = this._pokedex.length$;
    this.types = Array.from(this._types.pokemonTypes, (type) => type[1]);
    this.getPokemonPaginatorList();
  }

  /*
   Busca a lista de pokemons para páginador
   */
  getPokemonPaginatorList(limit: number = 25, offset: number = 0): void {
    this._pokedex.getPokemonList(limit, offset)
      .subscribe((pokemons) => {
        this.pokemonsPaginated = pokemons;
        this._pokemonsStore.setPokemons = pokemons;
      });
  }

  /*
    Muda a página ao avançar, voltar ou alterar o tamanho limite.
   */
  changePage(event): void {
    this.limit = event.pageSize;
    this.getPokemonPaginatorList(this.limit, event.pageIndex * this.limit);
  }

  /*
  Buscar os pokemons e redirecionar para detalhes 
   */
  onSearch(searchTerm: string): void {
    this._pokedex.getPokemonByName(searchTerm).subscribe(pokemon => {
      this._router.navigate([pokemon.id], {
        relativeTo: this.route,
        state: { pokemon }
      });
    });
  }

  /*
    Navega para a página do pokémon após clique em card
   */
  goToPokemonDetails(pokemon): void {
    this._router.navigate([pokemon.id], {
      relativeTo: this.route,
      state: { pokemon }
    });
  }

  /*
    Carrega todos os pokémons de um determinado tipo
   */
  loadPokemonByType(id: number): void {
    this._pokedex.getPokemonListByType(id)
      .subscribe(pokemons => {
        this.pokemonsByType = pokemons;
        this._pokemonsStore.setPokemons = pokemons;
      });
  }

}
