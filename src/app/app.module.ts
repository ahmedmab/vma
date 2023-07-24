import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VmaCalculComponent } from './vma-calcul/vma-calcul.component';
import { VmaTrainerComponent } from './vma-trainer/vma-trainer.component';
import { VmaSeanceComponent } from './vma-seance/vma-seance.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MyTimePipe } from './shared/pipes/my-time.pipe';
import { PoliticComponent } from './shared/footer/politic.component';
import { TermsComponent } from './shared/footer/terms.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';




@NgModule({
  declarations: [
    AppComponent,
    VmaCalculComponent,
    VmaTrainerComponent,
    VmaSeanceComponent,
    MyTimePipe,
    PoliticComponent,
    TermsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCHoBqCajC8lDSVvIE6dKEkfGUiFH581Qc",
      authDomain: "vma-up.firebaseapp.com",
      databaseURL: "https://vma-up-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "vma-up",
      storageBucket: "vma-up.appspot.com",
      messagingSenderId: "597623165988",
      appId: "1:597623165988:web:3b2870c3e15f397d1c34b1",
      measurementId: "G-SGS1DX5S0K"
    }),
    AngularFireStorageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
