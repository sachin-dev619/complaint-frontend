import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';

// import { StudentListComponent } from './students/list/list.component';
// import { AddStudentComponent } from './students/add/add.component';

import { CategoryComponent } from './categories/category/category.component';
import { SubcategoryComponent } from './categories/subcategory/subcategory.component';

import { DailyComponent } from './reports/daily/daily.component';
import { MonthlyComponent } from './reports/monthly/monthly.component';

import { ProfileComponent } from './settings/profile/profile.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { ComplaintListComponent } from './complaints/complaint-list/complaint-list.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentAddComponent } from './students/student-add/student-add.component';
import { ComplaintViewComponent } from './complaints/complaint-view/complaint-view.component';
// import { ListComponent } from './students/list/list.component';
// import { ListComponent } from './complaints/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'complaints', component: ComplaintListComponent },
      {path: 'complaint-view/:id',component: ComplaintViewComponent},

      { path: 'students-list', component: StudentListComponent },
      { path: 'add-student', component: StudentAddComponent },

      { path: 'category', component: CategoryComponent },
      { path: 'subcategory', component: SubcategoryComponent },

      { path: 'report/daily', component: DailyComponent },
      { path: 'report/monthly', component: MonthlyComponent },

      { path: 'profile', component: ProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
