import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { IBarNames } from 'src/app/models';
import { BarPropertiesService, UploadService, UserService } from 'src/app/services';
import { forkJoin } from 'rxjs';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-new-request',
	templateUrl: './new-request.component.html',
	styleUrls: ['./new-request.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NewRequestComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => NewRequestComponent),
			multi: true,
		}
	]
})
export class NewRequestComponent implements OnInit {
	@ViewChild('file', { static: false }) file
  	public files: Set<File> = new Set()
	public barNames: IBarNames[] = [];
	public progress;
	public uploading = false;
	public uploadSuccessful = false;
	public form: FormGroup;	
	
	constructor(
		private readonly barPropertiesService: BarPropertiesService,
		private readonly formBuilder: FormBuilder,
		private readonly uploadService: UploadService,
		private readonly userService: UserService
	) { }
	
	ngOnInit() {
		this.barPropertiesService.getBarsProperties().subscribe(bars => {
			this.barNames = bars.map(bar => { return { name: bar.name, id: bar.id } });
		});

		this.form = this.formBuilder.group({
			barId: undefined,
			reason: undefined,
			pictures: []
		});
	}

	onFilesAdded(): void {
		const files: { [key: string]: File } = this.file.nativeElement.files;
		for (let key in files) {
			if (!isNaN(parseInt(key))) {
				this.files.add(files[key]);
			}
		}
		this.uploading = true;
		this.progress = this.uploadService.upload(this.files);
		let allProgressObservables = [];
		for (let key in this.progress) {
		  allProgressObservables.push(this.progress[key].progress);
		}
	  
		forkJoin(allProgressObservables).subscribe(() => {
		  this.uploadSuccessful = true;
		  this.uploading = false;
		});
	}

	addFiles() {
		this.file.nativeElement.click();
	}

	public onSelectedItemChanged(item: { name: string, id: string }) {
		this.form.get('barId').setValue(item.id);
	}

	public onSubmitButton() {
		this.userService.requestOwnership(this.form.value).subscribe(r => console.log('r',r))
	}
}
