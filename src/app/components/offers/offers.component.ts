import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  public items = [];
  public item = '';
  ngOnInit() {
    this.dataApi.getAllItems().subscribe(items => {
      this.items = items;
    });
  }

}