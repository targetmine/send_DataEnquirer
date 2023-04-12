import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource} from '@angular/material/table';

import { BackendService } from 'src/app/shared/service/backend.service';
import { Element } from 'src/app/shared/models/element';
import { Attribute } from 'src/app/shared/models/attribute';
import { Relation } from 'src/app/shared/models/relation';

import model from 'src/assets/model.json';

@Component({
  selector: 'app-model-display',
  templateUrl: './model-display.component.html',
  styleUrls: ['./model-display.component.css']
})
export class ModelDisplayComponent implements AfterContentInit{
	
	elements: MatTableDataSource<Element> = new MatTableDataSource<Element>();
	relations: MatTableDataSource<Relation> = new MatTableDataSource<Relation>();

	@ViewChild('elementsTable')
	elementTable!: MatTable<Element[]>;
	elementTableColumns: string[] = ['elements', 'attributes'];

	@ViewChild('relationsTable')
	relationTable!: MatTable<Relation[]>;
	relationTableColumns: string[] = ['boxes', 'source', 'target'];

	@ViewChild('previewTable')
	previewTable!: MatTable<string[]>;
	previewTableData: MatTableDataSource<string> = new MatTableDataSource<string>();
	previewTableColumns: string[] = [];

	constructor(
		public readonly backendService: BackendService
	){ }

	ngAfterContentInit(): void {
		let eles: Element[] = [];
		model['elements'].forEach((value: any) => {
			let t: Element = { name: value.name, attributes: [] } as Element;
			value.attributes.forEach((a:any) => t.attributes.push(a as unknown as Attribute));
			eles.push(t);
		});
		this.elements = new MatTableDataSource<Element>(eles);
		
		
		let rels: Relation[] = [];
		model['relations'].forEach((value: any) => {
				let r: Relation = { 
					name: value.name, 
				 	srcElement: value.srcElement,
					srcAttribute: value.srcAttribute,
					trgElement: value.trgElement,
					trgAttribute: value.trgAttribute,
					cardinality: value.cardinality
				} as Relation;
				rels.push(r);
			});
		this.relations = new MatTableDataSource<Relation>(rels);

	}

	onPreview(): void {
		this.backendService.getElement(this.elements.data[0])
			.then(response => console.log(response.body));
	}

	onDownload(): void {
		throw new Error('need to implement this function');
	}
}
