import { SidTiposComponent } from './sid-tipos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SidTiposComponent
  },
  {
    path: 'game',
    loadChildren: () => import('../game/game.module').then(m => m.GamePageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('../details/details.module').then(m => m.DetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class tiposRoutingModule { }
