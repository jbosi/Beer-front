import { Component, OnInit } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';

@Component({
	selector: 'app-algolia-search',
	templateUrl: './algolia-search.component.html',
	styleUrls: ['./algolia-search.component.scss']
})
export class AlgoliaSearchComponent implements OnInit {
	
	constructor() { }
	
	ngOnInit() {
	}
	
	config = {
		apiKey: '66f0863857175bd58a0d410dc0ea03c0',
		indexName: 'test',
		appId: 'plK7QCYGSLY2',
	};
}
