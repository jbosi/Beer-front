import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { zip } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Component({
	selector: 'app-user-admin',
	templateUrl: './user-admin.component.html',
	styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
	public userList = new MatTableDataSource<any[]>([]);
	public ownersList: any[];
	public ownershipRequestList: any[];
	public userData: any;
	public userOwners: any;
	public userOwnersRequests: any;
	public userColumns: IcolumnsInterface;
	public userOwnersColumns: IcolumnsInterface;
	public userOwnersRequestsColumns: IcolumnsInterface;

	constructor(
		private userService: UserService
	) { }
	
	ngOnInit() {
		zip(
			this.userService.getAllUsers(),
			this.userService.getAllOwnership(),
			this.userService.getAllOwnershipRequests()
		).subscribe(([users, owners, ownersRequests]) => {
			this.userList.data = users;
			this.ownersList = owners;
			this.ownershipRequestList = ownersRequests;
		});

		this.userColumns = this.initUserColumns();
		this.userOwnersColumns = this.inituserOwnersColumns();
		this.userOwnersRequestsColumns = this.inituserOwnersRequestsColumns();
	}

	private initUserColumns(): IcolumnsInterface {
		return {
			columnsNames: ['username', 'email', 'isAdmin'],
			columnsProperties: [
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
			]
		};
	}

	private inituserOwnersColumns(): IcolumnsInterface {
		return {
			columnsNames: ['id', 'userId', 'barId'],
			columnsProperties: [
				{
					columnName: 'id',
					value: 'id',
					title: 'Id',
				},
				{
					columnName: 'userId',
					value: 'userId',
					title: 'UserId',
				},
				{
					columnName: 'barId',
					value: 'barId',
					title: 'BarId',
				}
			]
		};
	}

	private inituserOwnersRequestsColumns(): IcolumnsInterface {
		return {
			columnsNames: ['id', 'reason', 'pictures', 'studied', 'accepted', 'userId', 'barId'],
			columnsProperties: [
				{
					columnName: 'id',
					value: 'id',
					title: 'Id',
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
					columnName: 'userId',
					value: 'userId',
					title: 'UserId',
				},
				{
					columnName: 'barId',
					value: 'barId',
					title: 'BarId',
				}
			]
		};
	}
}
export interface IcolumnPropertiesInterface {
	columnName: string;
	value: string;
	title: string;
	class?: string;
}

export interface IcolumnsInterface {
	columnsNames: string[];
	columnsProperties: IcolumnPropertiesInterface[];
}