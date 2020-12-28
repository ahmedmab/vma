import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrainementComponent } from './entrainement.component';
import { Fractione30Component } from './fractione30/fractione30.component';
import { SeanceComponent } from './seance/seance.component';

const routes: Routes = [{ path: '', component: EntrainementComponent },
{ path: 'seance', component: SeanceComponent },
{ path: 'fractionne30', component: Fractione30Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrainementRoutingModule { }
