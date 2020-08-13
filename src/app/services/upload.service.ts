import { Injectable } from '@angular/core'
import {
	HttpClient,
	HttpRequest,
	HttpEventType,
	HttpResponse,
} from '@angular/common/http'
import { Observable, Subject } from 'rxjs'

const API_URL = ''

@Injectable()
export class UploadService {
	constructor(
		private http: HttpClient
	) {}
	
	public upload(files: Set<File>): { [key: string]: { progress: Observable<number> } } {
		const status: { [key: string]: { progress: Observable<number> } } = {};
		files.forEach(file => {
			const formData: FormData = new FormData();
			const progress = new Subject<number>();
			formData.append('file', file, file.name);
			const req = new HttpRequest('POST', API_URL, formData, {
				reportProgress: true
			});
			this.http.request(req).subscribe(event => {
				if (event.type === HttpEventType.UploadProgress) {
					const percentDone = Math.round(100 * event.loaded / event.total);
					progress.next(percentDone);
				} else if (event instanceof HttpResponse) {
					progress.complete();
				}
			});
			status[file.name] = { progress: progress.asObservable() };
		});
		return status;
	}
}