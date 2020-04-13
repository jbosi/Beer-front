import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

//TODO: remove when image will be provided in data
declare var require: any;

@Component({
	selector: 'app-bar-properties-modal',
	templateUrl: './bar-properties-modal.component.html',
	styleUrls: ['./bar-properties-modal.component.scss']
})
export class BarPropertiesModalComponent implements OnInit {
	
	constructor(
		public dialogRef: MatDialogRef<BarPropertiesModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit() {
		console.log('data', this.data)
	}

	closeDialog() {
		this.dialogRef.close('test!');
	}

	//TODO: remove when image will be provided in data
	getBeerImage(beerType: string) {
		return require(`../../../../icons/beers/beer-${beerType}.png`)
	}
}

	