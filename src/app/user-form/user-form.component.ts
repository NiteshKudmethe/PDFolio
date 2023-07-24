// user-form.component.ts
import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  user: any = {}; // Store form data here

  constructor(private userService: UserService) {}

  onSubmit() {
    // Call the service to save the user data and generate PDF
    this.userService.saveUserData(this.user);
    this.userService.generatePDF();
  }
}
