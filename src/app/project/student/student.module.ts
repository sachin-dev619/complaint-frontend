import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentLayoutComponent } from '../layout/student-layout/student-layout.component';
import { StudentSidebarComponent } from '../layout/student-sidebar/student-sidebar.component';
import { StudentHeaderComponent } from '../layout/student-header/student-header.component';
import { NgChartsModule } from 'ng2-charts';
import { AddComplaintComponent } from './add-complaint/add-complaint.component';
import { MyComplaintsComponent } from './my-complaints/my-complaints.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentComplaintViewComponent } from './student-complaint-view/student-complaint-view.component';
import { EditComplaintComponent } from './edit-complaint/edit-complaint.component';


@NgModule({
  declarations: [
     StudentLayoutComponent,
    StudentSidebarComponent,
    StudentHeaderComponent,
    DashboardComponent,
    AddComplaintComponent,
    MyComplaintsComponent,
    StudentProfileComponent,
    StudentComplaintViewComponent,
    EditComplaintComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    NgChartsModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
