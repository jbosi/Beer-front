import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services';
import { Observable, throwError } from 'rxjs';

@Component({
	selector: '[app-admin-table]',
	templateUrl: './admin-table.component.html',
	styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent implements OnInit {
	@Input() public labelEmpty: string;
	@Input() public displayEditIcons = false;
	@Input() public columnsProperties: IcolumnPropertiesInterface[] = [];
	@Input() public data: any;

	constructor(
		private readonly userService: UserService
	) { }
	
	ngOnInit() {
		console.log(this.columnsProperties)
	}

	public onAcceptOrRefuse(element, state: boolean): void | Observable<never> {
		if (element.user == null || element.bar == null) {
			return throwError("user or bar undefined");
		}
		this.userService.acceptOrRefuseRequest({
			userId: element.user.id,
			barId: element.bar.id,
			stateRequest: state
		}).subscribe();
	}
}

export interface IcolumnPropertiesInterface {
	columnName: string;
	value: string;
	title: string;
}
