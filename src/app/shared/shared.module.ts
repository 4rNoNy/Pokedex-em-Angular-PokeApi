import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { PokeSearchComponent } from './poke-search/poke-search.component';
import { PokeCardsComponent } from './poke-cards/poke-cards.component';
import { TypeBadgeComponent } from './type-badge/type-badge.component';
import { PokeStatusComponent } from './poke-status/poke-status.component';


//Bibliotecas
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatPaginatorModule, MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatCheckbox } from '@angular/material/checkbox';
import { MatIconModule, MatIcon } from '@angular/material/icon';


/*
 label do paginador
 */
const getRangeLabel = (page: number, pageSize: number, length: number) => {
  length = Math.max(length, 0);
  const start = page * pageSize;
  const end = start < length ?
    Math.min(start + pageSize, length) :
    start + pageSize;

  return `${start + 1} - ${end} de ${length}`;
}

/*
Tradutor paginator
*/
const translatePaginator = () => {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Pokémons por página';
  paginatorIntl.nextPageLabel = 'Próxima';
  paginatorIntl.lastPageLabel = 'Anterior';
  paginatorIntl.getRangeLabel = getRangeLabel;

  return paginatorIntl;
}

@NgModule({
  declarations: [
    PokeSearchComponent,
    PokeCardsComponent,
    TypeBadgeComponent,
    PokeStatusComponent



  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule
  ],
  exports: [
    MatTab,
    MatTabGroup,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatPaginator,
    MatCheckbox,
    MatIcon,
    TypeBadgeComponent,
    PokeSearchComponent,
    PokeStatusComponent,
    PokeCardsComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: translatePaginator() }
  ]
})
export class SharedModule { }
