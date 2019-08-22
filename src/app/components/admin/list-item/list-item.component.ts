import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { ItemInterface } from '../../../models/item';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/user';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }
  public items: ItemInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  public searchText: string;

  ngOnInit() {
    this.getListItems();
    this.getCurrentUser();
  }
  getCurrentUser() {
    // tslint:disable-next-line: no-shadowed-variable
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('1');
        });
      }
    });
  }
  getListItems() {
    this.dataApi.getAllItems().subscribe(items => {
      this.items = items;
    });
  }
  onDeleteItem(idItem: ItemInterface): void {
    const confirmation = confirm('Estas seguro, que deseas eliminar?');
    if (confirmation) {
      this.dataApi.deleteItem(idItem);
    }
  }
  onPreUpdateItem(item: ItemInterface) {
    this.dataApi.selectedItem = Object.assign({}, item);
  }
}
