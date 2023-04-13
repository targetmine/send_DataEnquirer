import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource} from '@angular/material/table';

import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

import { BackendService } from 'src/app/shared/service/backend.service';
import { Element } from 'src/app/shared/models/element';
import { Attribute } from 'src/app/shared/models/attribute';
import { Relation } from 'src/app/shared/models/relation';
import { ModelNode, ModelFlatNode } from 'src/app/shared/models/modelNode';

import model from 'src/assets/model.json';
import { FlatTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-model-display',
  templateUrl: './model-display.component.html',
  styleUrls: ['./model-display.component.css']
})
export class ModelDisplayComponent {

	modelControl: FlatTreeControl<ModelFlatNode>;
	modelFlatterner: MatTreeFlattener<ModelNode, ModelFlatNode>;
	
	elements: MatTreeFlatDataSource<ModelNode, ModelFlatNode>;
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
	){ 	

		this.modelControl = new FlatTreeControl<ModelFlatNode>(
			node => node.level,
			node => node.expandable
		);
		this.modelFlatterner = new MatTreeFlattener(
			this.transformer,
			node => node.level,
			node => node.expandable,
			node => node.children,
		)
		this.elements = new MatTreeFlatDataSource(this.modelControl, this.modelFlatterner);

		let data: ModelNode[] = [];
		model['elements'].forEach((value: any) => {
			let children: ModelNode[] = [];
			value.attributes.forEach((a:any) => children.push( {name: a.name, children: [] } as unknown as ModelNode));
			data.push( { name: value.name, children } as unknown as ModelNode );
		});
		this.elements.data = data;

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

	transformer(node: ModelNode, level: number): ModelFlatNode {
		return { 
			expandable: !!node.children && node.children.length > 0,
			name: node.name, 
			level } as ModelFlatNode;
	};

	hasChild(_: number, node: ModelFlatNode): boolean {
		return node.expandable;
	}

	onPreview(): void {
		this.backendService.getElement({ name: 'gene'} as Element )//this.elements.data[0])
			.then(response => console.log(response.body));
	}

	onDownload(): void {
		throw new Error('need to implement this function');
	}
}
