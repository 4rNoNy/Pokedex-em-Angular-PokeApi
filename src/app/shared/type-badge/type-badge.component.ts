import { TypesService } from './../../service/types.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-badge',
  templateUrl: './type-badge.component.html',
  styleUrls: ['./type-badge.component.scss']
})
export class TypeBadgeComponent implements OnInit {

  @Input() id: number;


  public colorS: string;
  public pokemonTypes: { name: string, color: string, contrast: string, img: string };

  constructor(
    private _types: TypesService
  ) { }

  /*
    Pega os dados de um tipo
   */
  ngOnInit(): void {
    this.pokemonTypes = this._types.pokemonTypes.get(this.id);
    this.colorS = ` 0 0 20px ${this._types.pokemonTypes.get(this.id).color}`;
  }

}

