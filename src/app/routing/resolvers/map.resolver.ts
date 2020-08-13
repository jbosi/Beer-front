import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IBarProperties } from '../../models';
import { BarPropertiesService } from '../../services';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MapResolver {
	constructor(
		protected router: Router,
		private barPropertiesService: BarPropertiesService
	) {	}

	public resolve(): Observable<IBarProperties[]> {
		return this.barPropertiesService.getBarsProperties();
	}
}