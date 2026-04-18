import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './_guards/auth.guard';
import { roleGuard } from './_guards/role.guard';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () => import('./project/auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'student',
    loadChildren: () => import('./project/student/student.module').then(m => m.StudentModule),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['student'] } // ✅
  },

  {
    path: 'admin',
    loadChildren: () => import('./project/admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] } // ✅
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
