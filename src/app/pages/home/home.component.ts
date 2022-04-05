import { PokemonsStore } from './../../stores/pokemon.store';
import { PokeAPiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { TypesService } from './../../service/types.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //poke-search
  private setAllPokemons: any;
  public getAllPokemons: any;
  public apiError: boolean = false;



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

  public getSearch(value: string) {
    const filter = this.setAllPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    })

    this.getAllPokemons = filter;
  }


  async ngOnInit(): Promise<void> {
    await this._pokemonsStore.initializeStore();
    this.length$ = this._pokedex.length$;
    this.types = Array.from(this._types.pokemonTypes, (type) => type[1]);
    this.getPokemonPaginatorList();
  }

  /**
   * Busca a lista de pokemons que deve ser exibida quando está com o campo de busca e páginador
   * @param limit Quantidade de itens que deve trazer
   * @param offset Numero de itens que deve pular para então buscar dados
   */
  getPokemonPaginatorList(limit: number = 25, offset: number = 0): void {
    this._pokedex.getPokemonList(limit, offset)
      .subscribe((pokemons) => {
        this.pokemonsPaginated = pokemons;
        this._pokemonsStore.setPokemons = pokemons;
      });
  }

  /**
   * Muda a página ao avançar, voltar ou alterar o tamanho limite. Atribui o novo valor do limite
   * e calcula o offset pela pagina atual * tamanho de itens, vai dar quantos deve pular.
   */
  changePage(event): void {
    this.limit = event.pageSize;
    this.getPokemonPaginatorList(this.limit, event.pageIndex * this.limit);
  }

  /**
   * Ao clicar para buscar no componente de search vai disparar essa função que busca um
   * pokémon por nome e já direciona para a página de detalhes
   */
  onSearch(searchTerm: string): void {
    this._pokedex.getPokemonByName(searchTerm).subscribe(pokemon => {
      this._router.navigate([pokemon.id], {
        relativeTo: this.route,
        state: { pokemon }
      });
    });
  }

  /**
   * Navega para a página do pokémon após clique em card
   */
  goToPokemonDetails(pokemon): void {
    this._router.navigate([pokemon.id], {
      relativeTo: this.route,
      state: { pokemon }
    });
  }

  /**
   * Carrega todos os pokémons de um determinado tipo
   */
  loadPokemonByType(id: number): void {
    this._pokedex.getPokemonListByType(id)
      .subscribe(pokemons => {
        this.pokemonsByType = pokemons;
        this._pokemonsStore.setPokemons = pokemons;
      });
  }


}
