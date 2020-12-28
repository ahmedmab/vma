import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { EntrainementRoutingModule } from './entrainement-routing.module';
import { EntrainementComponent } from './entrainement.component';
import { SeanceComponent } from './seance/seance.component';
import { Fractione30Component } from './fractione30/fractione30.component';


@NgModule({
  declarations: [EntrainementComponent, SeanceComponent, Fractione30Component],
  imports: [
    CommonModule,
    EntrainementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EntrainementModule { }
