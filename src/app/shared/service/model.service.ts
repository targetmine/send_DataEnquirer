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
}
