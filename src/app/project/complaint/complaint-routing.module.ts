import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  { path: 'add', component: AddComponent },
  {
    path: 'list',
    redirectTo: '/student/my-complaints',
    pathMatch: 'full'
  },
  { path: '', redirectTo: 'add', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintRoutingModule { }
