import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalloutErrorComponent } from './callout-error.component';

@NgModule({
	declarations: [
		CalloutErrorComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		CalloutErrorComponent,
	]
})
export class CalloutErrorModule { }
