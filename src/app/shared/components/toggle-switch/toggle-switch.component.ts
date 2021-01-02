import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: '[app-toggle-switch]',
	templateUrl: './toggle-switch.component.html',
	styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent {
	@Input() public label: string;
	@Input() public size: 'small' | undefined;
	@Input() public value: string;
	@Input() public checked = false; // TODO fix
	@Output() public switchChanged = new EventEmitter<any>();

	constructor() { }

	public onSwitchChange($event): void {
		this.switchChanged.emit($event);
	}
}
