import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-poke-status',
  templateUrl: './poke-status.component.html',
  styleUrls: ['./poke-status.component.scss']
})
export class PokeStatusComponent {

  public statusNames: Map<string, { name: string, color: string }> = new Map([
    ['hp', { name: 'Vida', color: '#FF5959' }],
    ['attack', { name: 'Ataque', color: '#F5AC78' }],
    ['defense', { name: 'Defesa', color: '#FAE078' }],
    ['special-attack', { name: 'Ataque SP', color: '#6890F0' }],
    ['special-defense', { name: 'Defesa SP', color: '#78C850' }],
    ['speed', { name: 'Velocidade', color: '#FA92B2' }]
  ]);

  /**
   * Input apenas com os dados de status de um pokémon. Não achei viavel tipar ele
   * então deixa com esse "any" implicito
   */
  @Input() status;
}

