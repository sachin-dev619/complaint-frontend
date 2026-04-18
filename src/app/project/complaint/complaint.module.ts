import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintRoutingModule } from './complaint-routing.module';
import { FormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
// import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    AddComponent,   // ✅ ADD THIS
    // ListComponent   // ✅ ADD THIS],
  ],
  imports: [
    CommonModule,
    ComplaintRoutingModule,
    FormsModule
  ]
})
export class ComplaintModule { }
