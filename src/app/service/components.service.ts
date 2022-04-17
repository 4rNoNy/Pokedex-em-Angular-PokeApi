import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ComponentsService {


  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  private alertSubject = new BehaviorSubject<string>(null);

  alert$: Observable<string> = this.alertSubject.asObservable();

  /*
    Mostra o loading até completar o observável 
   */
  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null)
      .pipe(
        tap(() => this.loadingOn()),
        concatMap(() => obs$),
        finalize(() => this.loadingOff())
      );
  }

  /*
    Ativa o loading
   */
  private loadingOn(): void {
    this.loadingSubject.next(true);
  }

  /*
    Desativa o loading
   */
  private loadingOff(): void {
    this.loadingSubject.next(false);
  }

  /*
    Mostra o alerta com a mensagem 
   */
  showAlertWithMessage(message: string): void {
    this.alertSubject.next(message);
  }

  /*
    Esconde o alerta
   */
  hideAlert(): void {
    this.alertSubject.next(null);
  }
}
