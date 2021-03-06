import { Component, OnInit } from '@angular/core';
import { IOwnershipRequest } from '@beer/models';
import { UserService } from '@beer/services';

@Component({
	selector: 'app-pending-request',
	templateUrl: './pending-request.component.html',
	styleUrls: ['./pending-request.component.scss']
})
export class PendingRequestComponent implements OnInit {
	public requests: IOwnershipRequest[] = [];

	constructor(
		private readonly userService: UserService
	) { }

	ngOnInit(): void {
		const userId = localStorage.getItem('user_id');
		this.userService.getAllOwnershipRequestsByUserId(userId).subscribe((requests: IOwnershipRequest[]) => {
			this.requests = requests;
		});
	}
}
