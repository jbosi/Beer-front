import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-callout-error',
	templateUrl: './callout-error.component.html',
	styleUrls: ['./callout-error.component.scss']
})
export class CalloutErrorComponent {
	@Input() public errorsMessage: string[];
}
