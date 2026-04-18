import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from 'src/app/_services/complaint.service';
import { AdminService } from 'src/app/_services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-complaint',
  templateUrl: './edit-complaint.component.html',
  styleUrls: ['./edit-complaint.component.scss']
})
export class EditComplaintComponent implements OnInit {

  editForm!: FormGroup;
  complaintId!: number;

  complaint: any;

  categories: any[] = [];
  subcategories: any[] = [];
  filteredSubcategories: any[] = [];

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  loading = false;

  serverErrors: any = {};

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ComplaintService,
    private router: Router,
    private adminservice: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    this.complaintId = Number(this.route.snapshot.paramMap.get('id'));

    this.editForm = this.fb.group({
      title: ['', Validators.required],
      category_id: ['', Validators.required],
      subcategory_id: ['', Validators.required],
      priority: ['', Validators.required],
      complaint_text: ['', Validators.required]
    });

    // 🔥 Load data in sequence (FIX)
    this.loadInitialData();
  }

  // =========================
  loadInitialData() {
    this.loading = true;

    this.service.getCategories().subscribe({
      next: (catRes: any) => {
        this.categories = catRes.data || catRes;

        this.adminservice.getSubcategories().subscribe({
          next: (subRes: any) => {
            this.subcategories = subRes.data || subRes;

            // ✅ After both loaded, get complaint
            this.getComplaint();
          },
          error: () => {
            this.toastr.error('Failed to load subcategories ❌');
            this.loading = false;
          }
        });

      },
      error: () => {
        this.toastr.error('Failed to load categories ❌');
        this.loading = false;
      }
    });
  }

  // =========================
  getComplaint() {

    this.service.getComplaintById(this.complaintId).subscribe({
      next: (res: any) => {

        this.complaint = res?.data ?? res;

        // Patch basic values
        this.editForm.patchValue({
          title: this.complaint.title,
          category_id: this.complaint.category_id,
          priority: this.complaint.priority,
          complaint_text: this.complaint.complaint_text
        });

        // 🔥 Filter subcategories first
        this.filteredSubcategories = this.subcategories.filter(
          (s: any) => s.category_id == this.complaint.category_id
        );

        // ✅ Then patch subcategory
        this.editForm.patchValue({
          subcategory_id: this.complaint.subcategory_id
        });

        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Failed to load complaint ❌');
      }
    });
  }

  // =========================
  onCategoryChange() {
    const catId = this.editForm.get('category_id')?.value;

    this.filteredSubcategories = this.subcategories.filter(
      (s: any) => s.category_id == catId
    );

    // Reset subcategory when user changes category
    this.editForm.patchValue({ subcategory_id: '' });
  }

  // =========================
  isInvalid(field: string): boolean {
    const control = this.editForm.get(field);
    return !!(control && control.touched && control.invalid);
  }

  getErrorMessage(field: string): string {
    const control = this.editForm.get(field);
    if (!control || !control.errors) return '';

    if (control.errors['required']) {
      switch (field) {
        case 'title': return 'Title is required';
        case 'category_id': return 'Category is required';
        case 'subcategory_id': return 'Subcategory is required';
        case 'priority': return 'Priority is required';
        case 'complaint_text': return 'Description is required';
      }
    }
    return '';
  }

  getServerError(field: string): string {
    return this.serverErrors[field] ? this.serverErrors[field][0] : '';
  }

  // =========================
  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file && file.size <= 5 * 1024 * 1024) {
      this.selectedFile = file;

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => this.previewUrl = reader.result as string;
        reader.readAsDataURL(file);
      }
    } else {
      this.toastr.warning('File must be less than 5MB ⚠️');
    }
  }

  removeFile() {
    this.selectedFile = null;
    this.previewUrl = null;
  }

  // =========================
  updateComplaint() {

    this.serverErrors = {};

    if (this.editForm.invalid) {
      Object.values(this.editForm.controls).forEach(c => c.markAsTouched());
      this.toastr.warning('Please fill all required fields ⚠️');
      return;
    }

    const formData = new FormData();

    Object.keys(this.editForm.value).forEach(key => {
      formData.append(key, this.editForm.value[key]);
    });

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.service.updateComplaint(this.complaintId, formData)
      .subscribe({
        next: () => {
          this.toastr.success('Complaint updated successfully 🎉');
          this.router.navigate(['/student/my-complaints']);
        },
        error: (err) => {

          if (err.status === 422) {
            this.serverErrors = err.error.errors;

            const firstError = Object.values(this.serverErrors)[0] as any;
            this.toastr.error(firstError[0]);
          } else {
            this.toastr.error('Failed to update complaint ❌');
          }
        }
      });
  }

  cancel() {
    this.router.navigate(['/student/my-complaints']);
  }
}