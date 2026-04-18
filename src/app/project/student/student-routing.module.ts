import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentLayoutComponent } from '../layout/student-layout/student-layout.component';
import { AddComplaintComponent } from './add-complaint/add-complaint.component';
import { MyComplaintsComponent } from './my-complaints/my-complaints.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentComplaintViewComponent } from './student-complaint-view/student-complaint-view.component';
import { EditComplaintComponent } from './edit-complaint/edit-complaint.component';

const routes: Routes = [
  {
  path: '',
  component: StudentLayoutComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'add-complaint', component: AddComplaintComponent },
    { path: 'my-complaints', component: MyComplaintsComponent },
    {path: 'complaint-view/:id',component: StudentComplaintViewComponent},
    {path: 'edit-complaint/:id',component: EditComplaintComponent},
    { path: 'profile', component: StudentProfileComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
