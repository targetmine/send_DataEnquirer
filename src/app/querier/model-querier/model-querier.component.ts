import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/shared/service/model.service';

@Component({
  selector: 'app-model-querier',
  templateUrl: './model-querier.component.html',
  styleUrls: ['./model-querier.component.css']
})
export class ModelQuerierComponent implements OnInit {

	previewTables: any[] = [];

	constructor(
		public readonly modelService: ModelService
	){
		this.modelService.model$.subscribe(data => {
			if(data.length == 0) return;
			data[0].children.forEach(element => {
				this.previewTables.push(
					{ name: element.name }
				);
			});
			data[1].children.forEach(relation => {
				this.previewTables.push(
					{ name: relation.name }
				)
			})
			console.log(this.previewTables);
		})
	}

	ngOnInit(): void { }
}
