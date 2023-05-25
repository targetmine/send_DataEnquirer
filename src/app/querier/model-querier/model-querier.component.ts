import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/shared/service/model.service';
import { Model, ModelNode } from 'src/app/shared/models/model';

@Component({
  selector: 'app-model-querier',
  templateUrl: './model-querier.component.html',
  styleUrls: ['./model-querier.component.css']
})
export class ModelQuerierComponent implements OnInit {

	elementTables: ModelNode[] = [];
	relationTables: ModelNode[] = [];

	constructor(
		public readonly modelService: ModelService
	){ }

	ngOnInit(): void { 
		this.modelService.selectedElements$.changed.subscribe(data => {
			const eles = this.modelService.selectedElements$.selected.filter(n => n.id.split('_').length === 2);
			this.elementTables = eles;
		});

		this.modelService.selectedRelations$.changed.subscribe(data => {
			const rels = this.modelService.selectedRelations$.selected.filter(n => n.id.split('_').length >= 2);
			this.relationTables = rels;
		})
	}
}
