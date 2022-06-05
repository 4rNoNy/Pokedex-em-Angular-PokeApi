import { DetailsComponent } from './pages/details/details.component';
import { GameComponent } from './pages/game/game.component';
import { SidTiposComponent } from './pages/sid-tipos/sid-tipos.component';
import { SidPokemonsComponent } from './pages/sid-pokemons/sid-pokemons.component';
import { SidDashboardComponent } from './pages/sid-dashboard/sid-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Lazy-loading
const routes: Routes = [
  {
    path: 'pokemons',
    loadChildren: () => import('./pages/sid-pokemons/sidpokemons.module').then(m => m.SidPokemonsModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/sid-dashboard/siddashboard.module').then(m => m.SidDashboardModule)
  },
  {
    path: 'tipos',
    loadChildren: () => import('./pages/sid-tipos/sidtipos.module').then(m => m.SidTiposModule)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: SidDashboardComponent },
  { path: 'pokemons', component: SidPokemonsComponent },
  { path: 'tipos', component: SidTiposComponent },
  { path: 'detalhes', component: DetailsComponent },
  { path: 'game', component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
