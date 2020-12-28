import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllureComponent } from './allure/allure.component';

import { CalculComponent } from './calcul.component';
import { ImcComponent } from './imc/imc.component';
import { VmaComponent } from './vma/vma.component';

const routes: Routes = [{ path: '', component: CalculComponent },
{ path: 'vma', component: VmaComponent },
{ path: 'allure', component: AllureComponent },
{ path: 'imc', component: ImcComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculRoutingModule { }
