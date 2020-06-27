import { Component } from '@angular/core';
import { AuthenticationService } from './services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'Drinks for all';
	currentUserToken: {token: string};
	
	constructor(
		private authenticationService: AuthenticationService
	) {
		this.authenticationService.currentUser.subscribe(userToken => this.currentUserToken = userToken);
	}
}