import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { ItemInterface } from '../../../models/item';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.css']
})
export class ItemModalComponent implements OnInit {

  constructor(public dataApi: DataApiService) { }
  @ViewChild('btnClose', {static: false}) btnClose: ElementRef;
  @Input() userUid: string;
  ngOnInit() {
  }
  onSaveItem(itemForm: NgForm): void {
    if (itemForm.value.id == null) {
      // New
      itemForm.value.userUid = this.userUid;
      this.dataApi.addItem(itemForm.value);
    } else {
      // Update
      this.dataApi.updateItem(itemForm.value);
    }
    itemForm.resetForm();
    this.btnClose.nativeElement.click();
  }
  onCloseModal(itemForm: NgForm): void {
    itemForm.resetForm();
  }
}
