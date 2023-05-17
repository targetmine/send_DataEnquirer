import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

import { BackendService } from 'src/app/shared/service/backend.service';
import { ModelService } from 'src/app/shared/service/model.service';
import { Element, Attribute, Relation, ModelNode} from 'src/app/shared/models/model';

@Component({
  selector: 'app-model-display',
  templateUrl: './model-display.component.html',
  styleUrls: ['./model-display.component.css']
})
export class ModelDisplayComponent implements OnInit{

	modelControl: NestedTreeControl<ModelNode>;
	modelElements: MatTreeNestedDataSource<ModelNode>;
	
	modelForm = new FormGroup({});	
	
	constructor(
		public readonly backendService: BackendService,
		public readonly modelService: ModelService,
	){ 
		this.modelControl = new NestedTreeControl<ModelNode>(node => node.children);
		this.modelElements = new MatTreeNestedDataSource();
		this.modelService.model$.subscribe(data => {
			this.initControls(this.flatControlNames(data));
			this.modelElements.data = data;
		});

		this.backendService.getModel()
			.then(response => {
				const eles = response.body?.elements ? 
					this.parseElements(response.body.elements):
					[] as ModelNode[];
					
				const rels = response.body?.relations ? 
					this.parseRelations(response.body.relations):
					[] as ModelNode[];
					
				this.modelService.model$.next([
					{ name: 'Elements', control: '', children: eles },
					{ name: 'Relations', control: '', children: rels }
				]);
			})
			.catch(error => {
				console.error('Error loading the model from the server');
			});
	}

	ngOnInit(): void {
		console.log(this.modelForm);
	}

	parseElements(elements: Element[]): ModelNode[]{
		let parsed: ModelNode[] = [];
		elements.forEach((e: Element) => {
			let children: ModelNode[] = [];
			e.attributes.forEach((a: Attribute) => {
				children.push({
					name: a.name, 
					control: `ele_${e.name}_${a.name}`,
					children: []
				})
			});
			parsed.push({name: e.name, control: '', children });
		});
		return parsed;
	}

	parseRelations(relations: Relation[]): ModelNode[]{
		let parsed: ModelNode[] = [];
		relations.forEach((r: Relation) => {
			parsed.push({
				name: `${r.srcElement}/${r.srcAttribute} - ${r.trgElement}/${r.trgAttribute} - ${r.cardinality}`,
				control: `rel_${r.name}`,
				children: []
			});
		});
		return parsed;
	}

	flatControlNames(nodes: ModelNode[]): string[]{
		if( nodes.length == 0) return [];
		let con = nodes.reduce<string[]>((acc,n)=> {
			if( n.control !== '')
				return [...acc, n.control, ...this.flatControlNames(n.children) ]
			else
				return [...acc, ...this.flatControlNames(n.children) ]
		},[])
		return con;
	}

	initControls(names: string[]){
		names.forEach((n: string) => {
			this.modelForm.addControl(`${n}`, new FormControl(false));
		});
	}

	hasChild(_:number, node: ModelNode): boolean {
		return !!node.children && node.children.length > 0;
	}

	checkboxChange(source: ModelNode, checked: boolean){
		console.log(source, checked);
	}


}
