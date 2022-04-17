import { ComponentsService } from 'src/app/service/components.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {


  constructor(public _components: ComponentsService) { }
}
