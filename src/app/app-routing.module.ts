import { VmaSeanceComponent } from './vma-seance/vma-seance.component';
import { VmaTrainerComponent } from './vma-trainer/vma-trainer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VmaCalculComponent } from './vma-calcul/vma-calcul.component';
import { TermsComponent } from './footer/terms.component';
import { PoliticComponent } from './footer/politic.component';

const routes: Routes = [
  {path: '', component: VmaCalculComponent,
  data: {
      title: 'Home'
  } },
  {path: 'allure_de_course', component: VmaTrainerComponent,
  data: {
      title: 'Allure de course'
  } },
  {path: 'plan_d_entrainment', component: VmaSeanceComponent,
  data: {
      title: `Plan d'entrainement`
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
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
