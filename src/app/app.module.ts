import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {provideFirebaseApp,initializeApp} from '@angular/fire/app';
import {enableIndexedDbPersistence, getFirestore, provideFirestore} from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideFirestore(()=> {
    const firestore = getFirestore();
    enableIndexedDbPersistence(firestore);
    return firestore;
  })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
