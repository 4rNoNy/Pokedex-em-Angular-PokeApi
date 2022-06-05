import { ngForAnimation } from './../../../assets/animations/animations';
import { Observable } from 'rxjs';
import { Pokemon } from './../../models/pokemon.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PokemonsStore } from './../../stores/pokemon.store';
import { PokeAPiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-sid-pokemons',
  templateUrl: './sid-pokemons.component.html',
  styleUrls: ['./sid-pokemons.component.scss'],
  animations: [ngForAnimation]
})
export class SidPokemonsComponent implements OnInit {

  public viewList = 'Pokémon';
  public length$: Observable<number>;
  public limit = 25;
  public limitOptions = [10, 25, 50];
  public pokemonsPaginated: Partial<Pokemon>[];


  constructor(
    public _pokedex: PokeAPiService,
    private _pokemonsStore: PokemonsStore,
    private _router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    await this._pokemonsStore.initializeStore();
    this.length$ = this._pokedex.length$;
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

}
