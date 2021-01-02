import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services';
import { Observable, throwError } from 'rxjs';
import { IcolumnProperties } from '../../models';

@Component({
	selector: '[app-admin-table]',
	templateUrl: './admin-table.component.html',
	styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent {
	@Input() public labelEmpty: string;
	@Input() public displayEditIcons = false;
	@Input() public columnsProperties: IcolumnProperties[] = [];
	@Input() public data: any;
	public hasError = false;
	public errorMessage: string;

	constructor(
		private readonly userService: UserService
	) { }

	public onAcceptOrRefuse(item, itemIndex: number, state: boolean): void | Observable<never> {
		if (item.user == null || item.bar == null) {
			return throwError('user or bar undefined');
		}
		this.userService.acceptOrRefuseRequest({
			userId: item.user.id,
			barId: item.bar.id,
			stateRequest: state
		}).subscribe(
			() => {
				this.data[itemIndex].studied = true;
				this.data[itemIndex].state = state;
			},
			error => {
				this.hasError = true;
				this.errorMessage = error.error ?
					error.error.detail || error.error.message || 'Oops, something went wrong' :
					'Oops, something went wrong';
			}
		);
	}
}
