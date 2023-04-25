import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource} from '@angular/material/table';

import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { FormGroup, FormControl } from '@angular/forms';

import { BackendService } from 'src/app/shared/service/backend.service';
import { Element } from 'src/app/shared/models/element';
import { Model, ModelNode} from 'src/app/shared/models/model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-model-display',
  templateUrl: './model-display.component.html',
  styleUrls: ['./model-display.component.css']
})
export class ModelDisplayComponent implements OnInit{

	modelControl: NestedTreeControl<ModelNode> = new NestedTreeControl<ModelNode>(node => node.children);
	modelElements: MatTreeNestedDataSource<ModelNode> = new MatTreeNestedDataSource();;
	modelForm = new FormGroup({});	
	
	@ViewChild('previewTable')
	previewTable!: MatTable<any[]>;
	previewTableData: MatTableDataSource<any> = new MatTableDataSource<any>();
	previewTableColumns: string[] = [];

	constructor(
		public readonly backendService: BackendService
	){ }

	ngOnInit(): void {
		this.backendService.getModel()
			.then(response => {
				let data: ModelNode[] = [];
				response.body?.elements.forEach((value: any) => {
					let children: ModelNode[] = [];
					value.attributes.forEach((a:any) => children.push( {name: a.name, children: [] } as unknown as ModelNode));
					data.push( { name: value.name, children } as unknown as ModelNode );
				});
				this.modelElements.data = data;
			})
			.catch(error => {
				console.error('Error loading the model from the server');
			});
		

		// 	// let rels: Relation[] = [];
	// 	// model['relations'].forEach((value: any) => {
	// 	// 		let r: Relation = { 
	// 	// 			name: value.name, 
	// 	// 		 	srcElement: value.srcElement,
	// 	// 			srcAttribute: value.srcAttribute,
	// 	// 			trgElement: value.trgElement,
	// 	// 			trgAttribute: value.trgAttribute,
	// 	// 			cardinality: value.cardinality
	// 	// 		} as Relation;
	// 	// 		rels.push(r);
	// 	// 	});
	// 	// this.relations = new MatTableDataSource<Relation>(rels);
		
	}

	hasChild(_: number, node: ModelNode): boolean {
		return !!node.children && node.children.length > 0;
	}

	onPreview(): void {
		
		
		this.backendService.getModel()
			.then(response => console.log(response))
		// this.backendService.getElement({ name: 'gene'} as Element )//this.elements.data[0])
		// 	.then(response => {
		// 		console.log(response.body)
		// 		this.previewTableData = new MatTableDataSource<any>(response.body as any[]);
		// 		let rows: any[];
		// model['relations'].forEach((value: any) => {
		// 		let r: Relation = { 
		// 			name: value.name, 
		// 		 	srcElement: value.srcElement,
		// 			srcAttribute: value.srcAttribute,
		// 			trgElement: value.trgElement,
		// 			trgAttribute: value.trgAttribute,
		// 			cardinality: value.cardinality
		// 		} as Relation;
		// 		rels.push(r);
		// 	});
		// this.relations = new MatTableDataSource<Relation>(rels);
				
			// })
			.catch(error => {
				console.error(error);
			});
	}

	onDownload(): void {
		throw new Error('need to implement this function');
	}
}
