import { Component } from '@angular/core';
import { ComponentsService } from 'src/app/service/components.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {


  constructor(public _components: ComponentsService) { }
}
