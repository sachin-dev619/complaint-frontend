import { Component } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  // ✅ define data
  data: any = {
    category_id: '',
    complaint_text: ''
  };

  // ✅ define submit function
  submit() {
    console.log('Form Data:', this.data);

    // TODO: call API here
  }
}
