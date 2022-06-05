import { SidDashboardComponent } from './sid-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SidDashboardComponent
  },
  {
    path: 'pokemons',
    loadChildren: () => import('../sid-pokemons/sidpokemons.module').then(m => m.SidPokemonsModule)
  }, {
    path: 'tipos',
    loadChildren: () => import('../sid-tipos/sidtipos.module').then(m => m.SidTiposModule)
  }, {
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
export class dashboardRoutingModule { }
