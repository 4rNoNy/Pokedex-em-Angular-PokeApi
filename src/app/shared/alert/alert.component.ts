import { ComponentsService } from 'src/app/service/components.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  /**
   * Construtor da classe com os serviços injetados
   * @param _components Serviço que controla os componentes
   */
  constructor(public _components: ComponentsService) { }
}
