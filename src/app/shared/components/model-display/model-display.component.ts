import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { FormGroup } from '@angular/forms';

import { BackendService } from 'src/app/shared/service/backend.service';
import { Element, Attribute, Relation, ModelNode} from 'src/app/shared/models/model';

@Component({
  selector: 'app-model-display',
  templateUrl: './model-display.component.html',
  styleUrls: ['./model-display.component.css']
})
export class ModelDisplayComponent implements OnInit{

	model$: BehaviorSubject<ModelNode[]>;
	modelControl: NestedTreeControl<ModelNode>;
	modelElements: MatTreeNestedDataSource<ModelNode>;
	
	modelForm = new FormGroup({});	
	loading: boolean = true;

	constructor(
		public readonly backendService: BackendService
	){ 
		this.model$ = new BehaviorSubject<ModelNode[]>([
			{ name: 'Elements', children: [] as ModelNode[] },
			{ name: 'Relations', children: [] as ModelNode[] }
		]);
		
		this.modelControl = new NestedTreeControl<ModelNode>(node => node.children);
		this.modelElements = new MatTreeNestedDataSource();
		this.model$.subscribe(data => this.modelElements.data = data);
	}

	ngOnInit(): void {
		this.backendService.getModel()
			.then(response => {
				let eles = [] as ModelNode[];
				let rels = [] as ModelNode[];
				if(response.body?.elements)
					eles = this.parseElements(response.body.elements);
				if(response.body?.relations) 
					rels = this.parseRelations(response.body.relations);

				this.model$.next([
					{ name: 'Elements', children: eles },
					{ name: 'Relations', children: rels }
				]);
			})
			.catch(error => {
				console.error('Error loading the model from the server');
			});
	}

	parseElements(elements: Element[]): ModelNode[]{
		let parsed: ModelNode[] = [];
		elements.forEach((e: Element) => {
			let children: ModelNode[] = [];
			e.attributes.forEach((a: Attribute) => children.push({name: a.name, children: []} ));
			parsed.push({name: e.name, children });
		});
		return parsed;
	}

	parseRelations(relations: Relation[]): ModelNode[]{
		let parsed: ModelNode[] = [];
		relations.forEach((r: Relation) => {
			parsed.push({
				name: `${r.srcElement}/${r.srcAttribute} - ${r.trgElement}/${r.trgAttribute} (${r.cardinality})`,
				children: []
			});
		});
		return parsed;
	}

	hasChild(_:number, node: ModelNode): boolean {
		return !!node.children && node.children.length > 0;
	}
}
