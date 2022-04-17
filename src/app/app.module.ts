import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { AppComponent } from './app.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { AlertComponent } from './shared/alert/alert.component';


//Modules
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const dbConfig: DBConfig = {
  name: 'pokemonDB',
  version: 1,
  objectStoresMeta: [{
    store: 'pokemon',
    storeConfig: null,
    storeSchema: [
      { name: 'height', keypath: 'height', options: { unique: false } },
      { name: 'id', keypath: 'id', options: { unique: false } },
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'sprites', keypath: 'sprites', options: { unique: false } },
      { name: 'stats', keypath: 'stats', options: { unique: false } },
      { name: 'types', keypath: 'types', options: { unique: false } },
      { name: 'weight', keypath: 'weight', options: { unique: false } }
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
