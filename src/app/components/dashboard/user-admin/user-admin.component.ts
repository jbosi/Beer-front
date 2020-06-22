import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-user-admin',
	templateUrl: './user-admin.component.html',
	styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
	public userList$: Observable<any>;
	
	constructor(
		private userService: UserService
	) { }
	
	ngOnInit() {
		this.userList$ = this.userService.getAll();
	}
	
}
	