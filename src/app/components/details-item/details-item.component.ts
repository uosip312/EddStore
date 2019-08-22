import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { ItemInterface } from '../../models/item';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details-item',
  templateUrl: './details-item.component.html',
  styleUrls: ['./details-item.component.css']
})
export class DetailsItemComponent implements OnInit {

  constructor(private dataApi: DataApiService, private route: ActivatedRoute) { }
  public item: ItemInterface = {};

  ngOnInit() {
    const idItem = this.route.snapshot.params['id'];
    this.getDetails(idItem);
  }
  getDetails(idItem: string): void {
    this.dataApi.getOneItem(idItem).subscribe(item => {
      this.item = item;
    });
  }

}
