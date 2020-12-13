import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VmaInfoComponent } from './vma-info/vma-info.component';
import { VmaCalculComponent } from './vma-calcul/vma-calcul.component';
import { VmaTrainerComponent } from './vma-trainer/vma-trainer.component';
import { VmaSeanceComponent } from './vma-seance/vma-seance.component';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    VmaInfoComponent,
    VmaCalculComponent,
    VmaTrainerComponent,
    VmaSeanceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
