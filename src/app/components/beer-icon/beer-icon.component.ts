import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-beer-icon',
  templateUrl: './beer-icon.component.html',
  styleUrls: ['./beer-icon.component.scss']
})
export class BeerIconComponent {
	@Input() public iconColor: string = '#FFFFFF';
}
