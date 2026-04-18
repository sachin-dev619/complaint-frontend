import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent implements OnInit {

  studentForm!: FormGroup;
  successMsg = '';
  errorMsg = '';
  validationErrors: any = {};
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roll_no: ['', Validators.required],
      class_models_id: ['', Validators.required],
      division_id: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$') // ✅ 10 digit only
      ]]
    });
  }

  get f() {
    return this.studentForm.controls;
  }

  onSubmit() {

    this.submitted = true;
    this.successMsg = '';
    this.errorMsg = '';
    this.validationErrors = {};

    if (this.studentForm.invalid) {
      return;
    }

    this.adminService.addStudent(this.studentForm.value).subscribe({
      next: (res: any) => {
        this.successMsg = res.message;
        this.studentForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        if (err.status === 422) {
          this.validationErrors = err.error.errors;
        } else {
          this.errorMsg = err.error?.message || 'Something went wrong';
        }
      }
    });
  }

  // allow only numbers
  onlyNumber(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  // clear backend error when typing
  clearBackendError(field: string) {
    if (this.validationErrors[field]) {
      delete this.validationErrors[field];
    }
  }
}