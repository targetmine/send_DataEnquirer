import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModelNode } from 'src/app/shared/models/model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

	model$: BehaviorSubject<ModelNode[]>;

  constructor() { 
		this.model$ = new BehaviorSubject<ModelNode[]>([]);
	}

	getElementAttributes(name:string):string[]{
		const ele = this.model$.value[0].children.filter(e => e.name === name );
		return ele[0].children.map(at => at.name);
	}
}
