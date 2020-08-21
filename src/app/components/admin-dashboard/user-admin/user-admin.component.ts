import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { zip } from 'rxjs';
import { IcolumnPropertiesInterface } from '../../shared';

@Component({
	selector: 'app-user-admin',
	templateUrl: './user-admin.component.html',
	styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
	public userList: any[];
	public ownersList: any[];
	public ownershipRequestList: any[];
	public userData: any;
	public userOwners: any;
	public userOwnersRequests: any;
	public userColumns: IcolumnPropertiesInterface[];
	public userOwnersColumns: IcolumnPropertiesInterface[];
	public userOwnersRequestsColumns: IcolumnPropertiesInterface[];

	constructor(
		private readonly userService: UserService
	) { }

	ngOnInit() {
		zip(
			this.userService.getAllUsers(),
			this.userService.getAllOwnership(),
			this.userService.getAllOwnershipRequests()
		).subscribe(([users, owners, ownersRequests]) => {
			this.userList = users;

			this.ownersList = owners
				.filter(owner => owner.user != null && owner.bar != null)
				.map(owner => {
				return {
					barName: owner.bar.name,
					email: owner.user.email,
					username: owner.user.username,
					userId: owner.user.id
				};
			});

			this.ownershipRequestList = ownersRequests
			.filter(request => request.bar != null && request.user != null)
			.map(request => {
				return {
					...request,
					barName: request.bar.name,
					username: request.user.username
				};
			});
		});

		this.userColumns = this.initUserColumns();
		this.userOwnersColumns = this.initUserOwnersColumns();
		this.userOwnersRequestsColumns = this.initUserOwnersRequestsColumns();
	}

	private initUserColumns(): IcolumnPropertiesInterface[] {
		return [
			{
				columnName: 'username',
				value: 'username',
				title: 'Username',
			},
			{
				columnName: 'email',
				value: 'email',
				title: 'Email',
			},
			{
				columnName: 'isAdmin',
				value: 'isAdmin',
				title: 'IsAdmin',
			}
		];
	}

	private initUserOwnersColumns(): IcolumnPropertiesInterface[] {
		return [
			{
				columnName: 'name',
				value: 'username',
				title: 'User Name',
			},
			{
				columnName: 'barName',
				value: 'barName',
				title: 'Bar name',
			},
			{
				columnName: 'email',
				value: 'email',
				title: 'Email',
			},
			{
				columnName: 'userId',
				value: 'userId',
				title: 'User id',
			},
		];
	}

	private initUserOwnersRequestsColumns(): IcolumnPropertiesInterface[] {
		return [
			{
				columnName: 'barName',
				value: 'barName',
				title: 'Bar name',
			},
			{
				columnName: 'username',
				value: 'username',
				title: 'username',
			},
			{
				columnName: 'reason',
				value: 'reason',
				title: 'Reason',
			},
			{
				columnName: 'pictures',
				value: 'pictures',
				title: 'Pictures',
			},
			{
				columnName: 'studied',
				value: 'studied',
				title: 'Studied',
			},
			{
				columnName: 'accepted',
				value: 'accepted',
				title: 'Accepted',
			},
			{
				columnName: 'icon',
				value: 'icon',
				title: 'icon',
			}
		];
	}
}
