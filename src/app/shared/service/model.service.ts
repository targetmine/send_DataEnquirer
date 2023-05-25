import { SelectionModel } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Model, ModelNode } from 'src/app/shared/models/model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

	elements$: BehaviorSubject<ModelNode[]>;
	selectedElements$: SelectionModel<ModelNode>;

	relations$: BehaviorSubject<ModelNode[]>;
	selectedRelations$: SelectionModel<ModelNode>;
	
  constructor() { 
		this.elements$ = new BehaviorSubject<ModelNode[]>([]);
		this.selectedElements$ = new SelectionModel<ModelNode>(true);

		this.relations$ = new BehaviorSubject<ModelNode[]>([]);
		this.selectedRelations$ = new SelectionModel<ModelNode>(true);
	}

	getSelectedElements(){
		const root = this.elements$.value[0];
		return root.children.filter(_ => this.selectedElements$.isSelected(_));
	}

	getSelectedRelations(){
		const root = this.relations$.value[0];
		return root.children.filter(_ => this.selectedRelations$.isSelected(_));
	}
}
