import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

@Component({
	selector: 'app-infinite-scroll',
	templateUrl: './infinite-scroll.component.html',
	styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
	@Input() options = {};
	@Output() scrolled = new EventEmitter();
	@ViewChild('anchor', { static: true }) anchor: ElementRef<HTMLElement>;

	private observer: IntersectionObserver;

	constructor(private readonly host: ElementRef) { }

	public get element() {
		return this.host.nativeElement;
	}

	ngOnInit(): void {
		const options = {
			root: this.isHostScrollable() ? this.host.nativeElement : null,
			...this.options
		};

		this.observer = new IntersectionObserver(([entry]) => {
			return entry.isIntersecting && this.scrolled.emit();
		}, options);

		this.observer.observe(this.anchor.nativeElement);
	}

	private isHostScrollable(): boolean {
		const style = window.getComputedStyle(this.element);

		return style.getPropertyValue('overflow') === 'auto' ||	style.getPropertyValue('overflow-y') === 'scroll';
	}

	ngOnDestroy(): void {
		this.observer.disconnect();
	}
}
