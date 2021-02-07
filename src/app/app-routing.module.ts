import { VmaSeanceComponent } from './vma-seance/vma-seance.component';
import { VmaTrainerComponent } from './vma-trainer/vma-trainer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VmaCalculComponent } from './vma-calcul/vma-calcul.component';
import { TermsComponent } from './footer/terms.component';
import { PoliticComponent } from './footer/politic.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: VmaCalculComponent,
  data: {
      title: 'home'
  } },
  {path: 'allure', component: VmaTrainerComponent,
  data: {
      title: 'allure de course'
  } },
  {path: 'seance', component: VmaSeanceComponent,
  data: {
      title: `plan d'entrainement`
  } },
  {path: 'terms', component: TermsComponent,
  data: {
      title: 'Terms & Conditions'
  } },
  {path: 'politique', component: PoliticComponent,
  data: {
      title: 'politique de confidentialité'
  } }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
