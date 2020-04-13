import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-filter',
  templateUrl: './button-filter.component.html',
  styleUrls: ['./button-filter.component.scss']
})
export class ButtonFilterComponent implements OnInit {

  @Input() iconName: string;

  ngOnInit() {
  }

}
