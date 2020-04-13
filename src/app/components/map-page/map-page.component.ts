import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {
  public iconChangeId: number
  constructor() { }

  ngOnInit() {
  }

  iconIdChanged(id: number) {
    this.iconChangeId = id
  }
}
