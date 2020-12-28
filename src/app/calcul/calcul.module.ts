import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { CalculRoutingModule } from './calcul-routing.module';
import { CalculComponent } from './calcul.component';
import { VmaComponent } from './vma/vma.component';
import { AllureComponent } from './allure/allure.component';
import { ImcComponent } from './imc/imc.component';


@NgModule({
  declarations: [CalculComponent, VmaComponent, AllureComponent, ImcComponent],
  imports: [
    CommonModule,
    CalculRoutingModule,
    FormsModule
    
  ]
})
export class CalculModule { }
