import { PokeAPiService } from './../../service/poke-api.service';
import { ComponentsService } from 'src/app/service/components.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public generationsRange: Map<string, { min: number, max: number }> = new Map([
    ['first', { min: 1, max: 151 }],
    ['second', { min: 152, max: 251 }],
    ['third', { min: 252, max: 386 }],
    ['fourth', { min: 387, max: 493 }],
    ['fifth', { min: 494, max: 649 }],
    ['sixth', { min: 650, max: 721 }],
    ['seventh', { min: 722, max: 809 }],
    ['eighth', { min: 810, max: 898 }]
  ]);


  public generationsForm: FormGroup = new FormGroup({
    first: new FormControl(true),
    second: new FormControl(false),
    third: new FormControl(false),
    fourth: new FormControl(false),
    fifth: new FormControl(false),
    sixth: new FormControl(false),
    seventh: new FormControl(false),
    eighth: new FormControl(false)
  })

  /*
    dados do pokémon. Vem da API, então deixei como any
   */
  public pokemon$: Observable<any>;

  /*
    Campo para resposta
   */
  public answer: FormControl = new FormControl('', Validators.required);

  /* acertou é true, se não é false, vazio é campo de input
   */
  public answerCondition: boolean = null;

  constructor(
    public _location: Location,
    public _components: ComponentsService,
    private _pokedex: PokeAPiService,
    private router: Router
  ) { }


  ngOnInit(): void {
    /*
     se o status da navegação se for false,  redireciona para a home
      e da um alert de que só pode jogar se estiver conectado
     */
    this._pokedex.connection$.subscribe(conn => {
      if (conn === false) {
        this.router.navigate(['/'], { replaceUrl: true });
        this._components.showAlertWithMessage('Só é possivel jogar se você estiver online');
      }
    });
    this.pokemon$ = this._components.showLoaderUntilCompleted(this.getPokemon());
  }

  /*
    Gera um ID randomico e busca o pokémo
   */
  getPokemon(): Observable<any> {
    /*
      Pega apenas as gerações marcadas
     */
    const generations = Object.entries(this.generationsForm.value).filter(g => g[1]);
    //  gerar os ids nas gerações selecionadas
    const possiblePokemons = generations.map(g => {
      // pega o minimo e o maximo de cada geração marcada
      const { min, max } = this.generationsRange.get(g[0]);
      // retorna um id randomico entre o minimo e o maximo
      return Math.floor(Math.random() * (max - min + 1) + min)
    })
    // Pega randomicamente um dos pokémons do array de gerações selecionadas
    const randomID = possiblePokemons[Math.floor(Math.random() * possiblePokemons.length)];
    return this._pokedex.getPokemonByID(randomID);
  }

  /*
    Tentou adivinhar qual o pokémon   
   */
  tryToGuess(name: string): void {
    if (name.split('-')[0].toLowerCase() === this.answer.value.trim().toLowerCase()) {
      this.answerCondition = true;
    } else {
      this.answerCondition = false;
    }
  }

  /*
   Tenta novamente
   */
  tryAgain(): void {
    this.pokemon$ = this._components.showLoaderUntilCompleted(this.getPokemon());
    this.answerCondition = null;
    this.answer.setValue('');
  }

}

