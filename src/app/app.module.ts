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
import { MyTimePipe } from './my-time.pipe';
import { PoliticComponent } from './footer/politic.component';
import { TermsComponent } from './footer/terms.component';




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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
