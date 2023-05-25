import { Component } from '@angular/core';
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
export class ModelDisplayComponent{

	elementsTree: MatTreeNestedDataSource<ModelNode>;
	elementsTreeControl: NestedTreeControl<ModelNode>;

	relationsTree: MatTreeNestedDataSource<ModelNode>;
	relationsTreeControl: NestedTreeControl<ModelNode>;

	constructor(
		public readonly backendService: BackendService,
		public readonly modelService: ModelService,
	){ 
		this.elementsTree = new MatTreeNestedDataSource<ModelNode>();
		this.elementsTreeControl = new NestedTreeControl<ModelNode>(node => node.children);
		this.modelService.elements$.subscribe(data => this.elementsTree.data = data);

		this.relationsTree = new MatTreeNestedDataSource<ModelNode>();
		this.relationsTreeControl = new NestedTreeControl<ModelNode>(node => node.children);
		this.modelService.relations$.subscribe(data => this.relationsTree.data = data);

		this.backendService.getModel()
			.then(response => {
				const eles = response.body?.elements ? 
					this.parseElements(response.body.elements) :
					[] as ModelNode[];
				this.modelService.elements$.next([
					{ name: 'Elements', id: 'ele', selected: false, children: eles }
				]);					
				const rels = response.body?.relations ?
					this.parseRelations(response.body.relations) :
					[] as ModelNode[];
				this.modelService.relations$.next([
					{ name: 'Relations', id:'rel', selected: false, children: rels}
				]);
			})
			.catch(error => {
				console.error(`Error loading the model from the server: ${error}`);
			});
	}

	parseElements(elements: Element[]): ModelNode[]{
		let parsed: ModelNode[] = [];
		elements.forEach((e: Element) => {
			let children: ModelNode[] = [];
			e.attributes.forEach((a: Attribute) => {
				children.push({
					name: a.name, 
					id: `ele_${e.name}_${a.name}`,
					selected: false,
					children: []
				})
			});
			parsed.push({
				name: e.name, 
				id: `ele_${e.name}`, 
				selected: false, 
				children 
			});
		});
		return parsed;
	}

	parseRelations(relations: Relation[]): ModelNode[]{
		let parsed: ModelNode[] = [];
		relations.forEach((r: Relation) => {
			parsed.push({
				name: `${r.srcElement}/${r.srcAttribute} - ${r.trgElement}/${r.trgAttribute} - ${r.cardinality}`,
				id: `rel_${r.name}`,
				selected: false,
				children: []
			});
		});
		return parsed;
	}

	hasChild(_:number, node: ModelNode): boolean {
		return !!node.children && node.children.length > 0;
	}

	getParent(node: ModelNode, type: 'element'|'relation'): ModelNode | null {
		const nodes = type === 'element' ?
			this.modelService.elements$.value :
			this.modelService.relations$.value;
		
		console.log('nodes', nodes);
		if (nodes[0] === node) return null;
		
		const name = node.id.split('_');
		if(name.length >= 2) return nodes[0];
	
		return nodes[0].children.filter(n => n.name === name[1])[0];
		
	}

	// getElementParent(node: ModelNode): ModelNode | null{
	// 	const eles = this.modelService.elements$.value;
	// 	if ( eles[0] === node ) return null;
		
	// 	const name = node.id.split('_');
	// 	if(name.length === 2) return eles[0];

	// 	return eles[0].children.filter(n => n.name === name[1])[0];
	// }

	// getRelationParent(node: ModelNode): ModelNode | null {
	// 	const rels = this.modelService.relations$.value;
	// 	if( rels[0] === node ) return null;
	// 	const name = node.id.split('_');
	// 	if(name.length === 2) return rels[0];

	// 	return rels[0].children.filter(n => n.name === name[1])[0];
	// }

	updateSelection(node: ModelNode, type: 'element'|'relation'): void {
		if(type === 'element'){
			this.modelService.selectedElements$.toggle(node);
			const selected = this.modelService.selectedElements$.isSelected(node);
			const descendants = this.elementsTreeControl.getDescendants(node);
			console.log('node desc', descendants);
			selected ? 
				this.modelService.selectedElements$.select(...descendants) :
				this.modelService.selectedElements$.deselect(...descendants);
		} 
		else{	
			this.modelService.selectedRelations$.toggle(node);
			const selected = this.modelService.selectedRelations$.isSelected(node);
			const descendants = this.relationsTreeControl.getDescendants(node);
			console.log('node desc', descendants);
			selected ?
				this.modelService.selectedRelations$.select(...descendants) :	
				this.modelService.selectedRelations$.deselect(...descendants);
		}

		const parent = this.getParent(node, type);
		console.log('parent', parent);
		if(parent) this.updateParentSelection(parent, type);
	}

	updateParentSelection(node: ModelNode, type: 'element'|'relation'): void{
		const someDescSelected = this.partialDescendantsSelected(node, type);
		const allDescSelected = this.allDescendantsSelected(node, type);
		
		if(type==='element'){
			(someDescSelected || allDescSelected) ? 
				this.modelService.selectedElements$.select(node) :
				this.modelService.selectedElements$.deselect(node);
		}else{
			(someDescSelected || allDescSelected) ? 
				this.modelService.selectedRelations$.select(node) :
				this.modelService.selectedRelations$.deselect(node);
		}

		const parent = this.getParent(node, type);
		if(parent) this.updateParentSelection(parent, type);
	}

	// updateElementSelection(node: ModelNode): void {
	// 	this.modelService.selectedElements$.toggle(node);
	// 	const selected = this.modelService.selectedElements$.isSelected(node);
	// 	// need to select/deselect all descendants
	// 	const descendants = this.elementsTreeControl.getDescendants(node);
	// 	selected ? 
	// 		this.modelService.selectedElements$.select(...descendants) :
	// 		this.modelService.selectedElements$.deselect(...descendants);
	// 	// need to partially select/deselect the parents
	// 	const parent = this.getParent(node, 'element');
	// 	if( parent ) this.updateParentSelection(parent);
	// }

	// updateRelationSelection(node: ModelNode): void {
	// 	this.modelService.selectedRelations$.toggle(node);
	// 	const selected = this.modelService.selectedRelations$.isSelected(node);
	// 	const descendants = this.relationsTreeControl.getDescendants(node);
	// 	selected ?
	// 		this.modelService.selectedRelations$.select(...descendants) :
	// 		this.modelService.selectedRelations$.deselect(...descendants);
	// 	const parent = this.getParent(node, 'relation');
	// 	if( parent ) this.updateParentSelection(parent);
	// }

	allDescendantsSelected(node: ModelNode, type: 'element'|'relation'): boolean{
		if(type === 'element'){
			const desc = this.elementsTreeControl.getDescendants(node);
			const descAllSelected = desc.length > 0 &&
				desc.every(child => { return this.modelService.selectedElements$.isSelected(child) });
			return descAllSelected;
		}
		else{
			const desc = this.relationsTreeControl.getDescendants(node);
			const descAllSelected = desc.length > 0 &&
				desc.every(child => { return this.modelService.selectedRelations$.isSelected(child) });
			return descAllSelected;
		}
	}

	// allElementDescendantsSelected(node: ModelNode): boolean {
		
	// }

	// allRelationDescendantsSelected(node: ModelNode): boolean{
	// 	return false;
	// }

	partialDescendantsSelected(node: ModelNode, type: 'element'|'relation'): boolean{
		if(type === 'element'){
			const desc = this.elementsTreeControl.getDescendants(node);
			const descSelected = desc.length > 0 &&
				desc.some(child => { return this.modelService.selectedElements$.isSelected(child)});
			return descSelected && !this.allDescendantsSelected(node, type);
		}
		else{
			const desc = this.relationsTreeControl.getDescendants(node);
			const descSelected = desc.length > 0 &&
				desc.some(child => { return this.modelService.selectedRelations$.isSelected(child)});
			return descSelected && !this.allDescendantsSelected(node, type);
		}
	}

	// partialElementDescendantsSelected(node: ModelNode): boolean {
	// 	const desc = this.elementsTreeControl.getDescendants(node);
	// 	const descSelected = desc.length > 0 &&
	// 		desc.some(child => { return this.modelService.selectedElements$.isSelected(child)});
	// 	return descSelected && !this.allElementDescendantsSelected(node);
	// }

	// partialRelationDescendantsSelected(node: ModelNode): boolean {
	// 	return false;
	// }

}
