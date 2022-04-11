import { TypesService } from './../../service/types.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-badge',
  templateUrl: './type-badge.component.html',
  styleUrls: ['./type-badge.component.scss']
})
export class TypeBadgeComponent implements OnInit {
  /**
    * ID para buscar os dados do type
    */
  @Input() id: number;

  /**
   * Dados de um tipo de pokémon
   */
  public btn: { name: string, color: string, contrast: string };

  /**
   * Construtor da classe com os serviços injetados
   */
  constructor(
    private _types: TypesService
  ) { }

  /**
   * Ao inicializar pega os dados de um tipo, como nome e cores para a badge
   */
  ngOnInit(): void {
    this.btn = this._types.btnTypes.get(this.id);
  }

}
