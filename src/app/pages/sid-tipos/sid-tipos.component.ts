import { ngForAnimation } from './../../../assets/animations/animations';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Router, ActivatedRoute } from '@angular/router';
import { TypesService } from './../../service/types.service';
import { PokemonsStore } from './../../stores/pokemon.store';
import { PokeAPiService } from 'src/app/service/poke-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sid-tipos',
  templateUrl: './sid-tipos.component.html',
  styleUrls: ['./sid-tipos.component.scss'],
  animations: [ngForAnimation]

})
export class SidTiposComponent implements OnInit {
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
  ) { }

  async ngOnInit(): Promise<void> {
    await this._pokemonsStore.initializeStore();
    this.length$ = this._pokedex.length$;
    this.types = Array.from(this._types.pokemonTypes, (type) => type[1]);
  }

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
