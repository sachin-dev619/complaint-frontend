import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from 'src/app/_services/complaint.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.scss']
})
export class AddComplaintComponent implements OnInit {

  complaintForm!: FormGroup;

  categories: any[] = [];
  filteredSubcategories: any[] = [];

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  isSubmitting = false;
  loadingSub = false;

  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.complaintForm = this.fb.group({
      title: ['', Validators.required],
      category_id: ['', Validators.required],
      subcategory_id: ['', Validators.required],
      priority: ['', Validators.required],
      complaint_text: ['', Validators.required]
    });

    this.loadCategories();
  }

  // ✅ VALIDATION HELPERS
  isInvalid(field: string): boolean {
    const control = this.complaintForm.get(field);
    return !!(control && control.touched && control.invalid);
  }

  getErrorMessage(field: string): string {
    const control = this.complaintForm.get(field);

    if (!control || !control.errors) return '';

    if (control.errors['required']) {
      switch (field) {
        case 'title': return 'Title is required';
        case 'category_id': return 'Category is required';
        case 'subcategory_id': return 'Subcategory is required';
        case 'priority': return 'Priority is required';
        case 'complaint_text': return 'Description is required';
        default: return 'This field is required';
      }
    }

    return '';
  }

  // ✅ LOAD DATA
  loadCategories() {
    this.complaintService.getCategories(true).subscribe({
      next: (res: any) => this.categories = res.data || [],
      error: () => this.toastr.error('Failed to load categories')
    });
  }

  onCategoryChange(): void {
    const id = this.complaintForm.get('category_id')?.value;
    if (!id) return;

    this.loadingSub = true;

    this.complaintService.getSubcategoriesByCategory(id).subscribe({
      next: (res: any) => {
        this.filteredSubcategories = res.data || [];
        this.loadingSub = false;
      },
      error: () => {
        this.loadingSub = false;
        this.toastr.error('Failed to load subcategories');
      }
    });

    this.complaintForm.patchValue({ subcategory_id: '' });
  }

  // ✅ FILE
  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file && file.size <= 5 * 1024 * 1024) {
      this.selectedFile = file;

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => this.imagePreview = reader.result;
        reader.readAsDataURL(file);
      }
    } else {
      this.toastr.warning('File must be less than 5MB');
    }
  }

  removeFile(): void {
    this.selectedFile = null;
    this.imagePreview = null;
  }

  resetForm(): void {
    this.complaintForm.reset();
    this.filteredSubcategories = [];
    this.removeFile();
  }

  // ✅ SUBMIT
  onSubmit(): void {

    if (this.complaintForm.invalid) {
      Object.values(this.complaintForm.controls).forEach(c => c.markAsTouched());
      this.toastr.warning('Please fill all required fields');
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    Object.keys(this.complaintForm.value).forEach(key => {
      formData.append(key, this.complaintForm.value[key]);
    });

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.complaintService.addComplaint(formData).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;

        this.toastr.success(
          `Complaint No: ${res.data?.complaint_no}`,
          'Submitted successfully'
        );

        this.resetForm();
      },
      error: (err) => {
        this.isSubmitting = false;

        if (err?.status === 422 && err?.error?.errors) {
          const first = Object.values(err.error.errors)[0] as string[];
          this.toastr.error(first?.[0] || 'Validation failed');
          return;
        }

        this.toastr.error(err?.error?.message || 'Failed to submit complaint');
      }
    });
  }
}