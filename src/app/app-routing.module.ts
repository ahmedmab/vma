import { VmaTrainerComponent } from './vma-trainer/vma-trainer.component';
import { VmaInfoComponent } from './vma-info/vma-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/info', pathMatch: 'full'},
  {path: 'info', component: VmaInfoComponent},
  {path: 'trainer-plan', component: VmaTrainerComponent},
  { path: 'calcul', loadChildren: () => import('./calcul/calcul.module').then(m => m.CalculModule) },
  { path: 'entrainement', loadChildren: () => import('./entrainement/entrainement.module').then(m => m.EntrainementModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
