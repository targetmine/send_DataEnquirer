import { SelectionModel } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ModelNode } from 'src/app/shared/models/model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

	elements$: BehaviorSubject<ModelNode[]>;
	selectedElements$: SelectionModel<ModelNode>;
	
  constructor() { 
		this.elements$ = new BehaviorSubject<ModelNode[]>([]);
		this.selectedElements$ = new SelectionModel<ModelNode>(true);
	}

	getSelectedElements(){
		const root = this.elements$.value[0];
		return root.children.filter(_ => this.selectedElements$.isSelected(_));
	}
}
