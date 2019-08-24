import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { UserApiService } from '../../../services/user-api.service';
import { UserInterface } from '../../../models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  constructor(public userApi: UserApiService) { }
  @ViewChild('btnClose', {static: false}) btnClose: ElementRef;
  ngOnInit() {
  }
  onSaveUser(userForm: NgForm): void {
    if (userForm.value.id == null) {
      // New
    } else {
      // Update
      this.userApi.updateUser(userForm.value);
    }
    userForm.resetForm();
    this.btnClose.nativeElement.click();
  }
  onCloseModal(userForm: NgForm): void {
    userForm.resetForm();
  }
}
