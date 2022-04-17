import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  /*
    verifica se está invalido
   */
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
} @Component({
  selector: 'poke-search',
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.scss']
})
export class PokeSearchComponent {

  /*
   envia dados de busca
   */
  @Output() search: EventEmitter<string> = new EventEmitter<string>();


  public searchTerm: FormControl = new FormControl('', Validators.required);

  public matcher = new MyErrorStateMatcher();

  /*emite o evento de buscai
   */
  doSearch(): void {
    if (this.searchTerm.valid) {
      this.search.emit(this.searchTerm.value.trim());
    }
  }

}
