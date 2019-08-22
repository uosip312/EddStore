import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../../services/user-api.service';
import { UserInterface } from '../../../models/user';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  constructor(private userApi: UserApiService, private authService: AuthService) { }
  public users: UserInterface[];

  ngOnInit() {
    this.getListUsers();
  }
  getListUsers() {
    this.userApi.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }
  onDeleteUser(idUser: UserInterface): void {
    const confirmation = confirm('Estas seguro, que deseas eliminar?');
    if (confirmation) {
      this.userApi.deleteUser(idUser);
    }
  }
  onPreUpdateUser(user: UserInterface) {
    this.userApi.selectedUser = Object.assign({}, user);
  }
}
