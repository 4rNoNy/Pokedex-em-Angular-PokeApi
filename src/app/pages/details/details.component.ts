import { Pokemon } from 'src/app/models/pokemon.model';
import { Pokemons } from 'src/app/models/pokemons.model';
import { TypesService } from './../../service/types.service';
import { ComponentsService } from 'src/app/service/components.service';
import { PokeAPiService } from 'src/app/service/poke-api.service';
import { PokemonsStore } from './../../stores/pokemon.store';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  /**
   * Dados do pokémon que vieram na navegação ou que vai ser pego por id
   */
  public pokemon: Pokemon;
  public id!: number;
  public pokemons!: Pokemons;
  /**
   * Numero do pokémon na listagem oficial
   */
  public number: string;


  public colorS: string;
  public pokemonTypes: { name: string, color: string, contrast: string, img: string };


  constructor(
    private _router: Router,
    private _types: TypesService,
    private route: ActivatedRoute,
    private _pokemonStore: PokemonsStore,
    private _pokedex: PokeAPiService,
    private _components: ComponentsService,
    public _location: Location
  ) { }


  ngOnInit(): void {


    this.route.paramMap.subscribe(async (params: ParamMap) => {
      // pega o id
      const id = params.get('id');
      // transforma o id em numero para apresentação
      this.number = id.padStart(3, '0');
      // Se existe uma navegação, ou seja, veio da home, entra aqui e pega o estado da navegação
      if (this._router.getCurrentNavigation()) {
        this.pokemon = this.initializePokémonInformation(this._router.getCurrentNavigation().extras.state);
      } else {
        // se não veio pela navegação, então pode ser que o usuario digitou id diretamente na url
        // por isso inicializa o store dos pokemons
        await this._pokemonStore.initializeStore();
        // se esse pokémon está no store, pega os dados dele
        if (this._pokemonStore.getPokemons[id]) {
          this.pokemon = this.initializePokémonInformation(this._pokemonStore.getPokemons[id]);
        } else {
          // se o pokémon não está no store, então busca na API
          const getPokemon$ = this._pokedex.getPokemonByID(id);
          this._components.showLoaderUntilCompleted(this._pokedex.getPokemonByID(id)).subscribe(pokemon => {
            this.pokemon = this.initializePokémonInformation(pokemon);
          });
        }
      }
    });
    this.getIdLink();
    this.getdetalhes();
  }



  getdetalhes() {
    const url = `https://pokeapi.co/api/v2/pokemon/${this.id}`;
    this._pokedex.apiGetPokemons(url).subscribe(x => {
      this.pokemons = x;
    })
  }
  getIdLink() {
    this.route.queryParams.subscribe(x => {
      this.id = x['id'];
    })
  }

  colorType(types): string {
    const typeID = +types;
    return ` ${this._types.pokemonTypes.get(typeID).color}82`;
  }
  // [ngStyle]="{ background: colorType(pokemon?.types[0])}"

  shadowBox(types): string {
    const typeID = +types;
    return ` 0 0 20px ${this._types.pokemonTypes.get(typeID).color}`;
  }
  //  [ngStyle]="{ 'box-shadow': shadowBox(pokemon?.types[0])}"


  /**
   * Como os dados da API vem diferente dos usados na aplicação, então organizo de forma correta
   * utilizando esse método. Que faz basicamente o mesmo código que tem no metodo do serviço de
   * pokedex, mas resolvi deixar um exclusivo aqui
   */
  initializePokémonInformation(pokemon): Pokemon {
    return {
      height: pokemon.height,
      id: pokemon.id,
      name: pokemon.name.split('-')[0],
      sprites: {
        front: pokemon.sprites.front ? pokemon.sprites.front : pokemon.sprites.front_default,
        official: pokemon.sprites.official ? pokemon.sprites.official : pokemon.sprites.other['official-artwork'].front_default
      },
      stats: pokemon.stats,
      types: pokemon.types.map(type => +type.type.url.split('type/')[1].replace(/[^0-9]/g, '')),
      weight: pokemon.weight
    };
  }

}
