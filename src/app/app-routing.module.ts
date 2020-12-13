import { VmaSeanceComponent } from './vma-seance/vma-seance.component';
import { VmaTrainerComponent } from './vma-trainer/vma-trainer.component';
import { VmaInfoComponent } from './vma-info/vma-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VmaCalculComponent } from './vma-calcul/vma-calcul.component';

const routes: Routes = [
  {path: '', redirectTo: '/info', pathMatch: 'full'},
  {path: 'info', component: VmaInfoComponent},
  {path: 'calcul', component: VmaCalculComponent},
  {path: 'trainer-plan', component: VmaTrainerComponent},
  {path: 'seance', component: VmaSeanceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
