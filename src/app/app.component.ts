import { Component } from '@angular/core';
import { AuthenticationService } from './services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public title = 'Drinks for all';
	public currentUserToken: { token: string };

	constructor(
		private readonly authenticationService: AuthenticationService
	) {
		this.authenticationService.currentUser.subscribe(userToken => this.currentUserToken = userToken);
	}
}
