import { Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { forkJoin } from 'rxjs';
import { IBarNames } from 'src/app/models';
import { BarPropertiesService, UploadService, UserService } from 'src/app/services';

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
	@ViewChild('file', { static: false }) file;
	public files: Set<File> = new Set();
	public barNames: IBarNames[] = [];
	public progress;
	public uploading = false;
	public uploadSuccessful = false;
	public form: FormGroup;
	public formState: 'loading' | 'saved' | 'error' = null;

	constructor(
		private readonly barPropertiesService: BarPropertiesService,
		private readonly formBuilder: FormBuilder,
		private readonly uploadService: UploadService,
		private readonly userService: UserService,
		private readonly snackBar: MatSnackBar
	) { }

	ngOnInit(): void {
		this.barPropertiesService.getBarsProperties().subscribe(bars => {
			this.barNames = bars.map(bar => {
				return { name: bar.name, id: bar.id };
			});
		});

		this.form = this.formBuilder.group({
			barId: undefined,
			reason: undefined,
			pictures: []
		});
	}

	onFilesAdded(): void {
		const files: { [key: string]: File } = this.file.nativeElement.files;
		for (const key in files) {
			if (!isNaN(parseInt(key, 10))) {
				this.files.add(files[key]);
			}
		}
		this.uploading = true;
		this.progress = this.uploadService.upload(this.files);
		const allProgressObservables = [];
		for (let key in this.progress) {
			allProgressObservables.push(this.progress[key].progress);
		}

		forkJoin(allProgressObservables).subscribe(() => {
			this.uploadSuccessful = true;
			this.uploading = false;
		});
	}

	public addFiles(): void {
		this.file.nativeElement.click();
	}

	public onSelectedItemChanged(item: { name: string, id: string }): void {
		this.form.get('barId').setValue(item.id);
	}

	public onSubmitButton(): void {
		this.formState = 'loading';
		this.userService.requestOwnership(this.form.value).subscribe(
			() => {
				this.formState = 'saved';
				setTimeout(() => { this.formState = null; }, 1500);
			},
			error => {
				this.formState = 'error';
				this.snackBar.open(error.error.message, '', {
					duration: 2000,
				});
				setTimeout(() => { this.formState = null; }, 1500);
			}
		);
	}
}
