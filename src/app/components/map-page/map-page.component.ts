import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-map-page',
	templateUrl: './map-page.component.html',
	styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {
	private isMobile: boolean;
	
	ngOnInit() {
		window.innerWidth < 768 ? this.isMobile = true : this.isMobile = false;
	}

	public getIsMobile(): boolean {
		return this.isMobile;
	}
}
