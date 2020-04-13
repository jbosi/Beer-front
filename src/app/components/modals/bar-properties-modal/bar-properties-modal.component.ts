import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
}

	