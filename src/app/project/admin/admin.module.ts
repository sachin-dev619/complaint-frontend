import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHeaderComponent } from '../layout/admin-header/admin-header.component';
import { AdminSidebarComponent } from '../layout/admin-sidebar/admin-sidebar.component';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { PendingComponent } from './complaints/pending/pending.component';
import { InprogressComponent } from './complaints/inprogress/inprogress.component';
import { ResolvedComponent } from './complaints/resolved/resolved.component';
import { CategoryComponent } from './categories/category/category.component';
import { SubcategoryComponent } from './categories/subcategory/subcategory.component';
import { DailyComponent } from './reports/daily/daily.component';
import { MonthlyComponent } from './reports/monthly/monthly.component';
import { ProfileComponent } from './settings/profile/profile.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { ComplaintListComponent } from './complaints/complaint-list/complaint-list.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentAddComponent } from './students/student-add/student-add.component';
import { HttpClientModule } from '@angular/common/http';
import { ComplaintViewComponent } from './complaints/complaint-view/complaint-view.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminSidebarComponent,
    AdminHeaderComponent,
    DashboardComponent,
    ComplaintListComponent,
    PendingComponent,
    InprogressComponent,
    ResolvedComponent,
    CategoryComponent,
    SubcategoryComponent,
    DailyComponent,
    MonthlyComponent,
    ProfileComponent,
    ChangePasswordComponent,
    StudentListComponent,
    StudentAddComponent,
    ComplaintViewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
     ReactiveFormsModule,
  HttpClientModule
  ]
})
export class AdminModule { }
