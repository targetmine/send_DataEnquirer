import { Component, Input, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BackendService } from '../../service/backend.service';
import { ModelService } from '../../service/model.service';
import { Cardinality, ModelNode } from 'src/app/shared/models/model';
import { Element } from 'src/app/shared/models/model';
import { MatTab } from '@angular/material/tabs';

@Component({
  selector: 'app-relation-preview-table',
  templateUrl: './relation-preview-table.component.html',
  styleUrls: ['./relation-preview-table.component.css']
})
export class RelationPreviewTableComponent{
	elements!: Element[];
	@Input() relation!: ModelNode;

	@ViewChild('previewTable')
	previewTable!: MatTable<any[]>
	previewTableData: MatTableDataSource<any> = new MatTableDataSource<any>();
	previewTableColumns: string[] = ['Source', 'Target'];

	constructor(
		public readonly backendService: BackendService,
		public readonly modelService: ModelService
	){ 
		this.backendService.getModel()
		.then(response => {
			this.elements = response.body?.elements ? 
				response.body.elements :
				[] as Element[];
		})
		.catch(error => {
			console.error(`Error loading the model from the server: ${error}`);
			this.elements = [] as Element[];
		});
	}

	onPreview(){
		const [source, target, cardinality] = this.relation.name.split(' - ');
		const [srcEle, srcAttr] = source.split('/');
		const [trgEle, trgAttr] = target.split('/');
		let name: string;
		let columns: string[];
		switch(cardinality){
			case 'one to one':
				name = srcEle;
				columns = [srcAttr, target.replace('/','_')];
				break;
			case 'one to many':
				name = trgEle;
				columns = [source.replace('/', '_'), trgAttr];
				break;
			default: // 'many to many'
				name = `${source.split('/')[0].trim()}_${target.split('/')[0].trim()}`;
				columns = ['*'];
				break;
		 }
		this.backendService.getElement(name, columns, 10)
		.then(response => {
			let data = response.body as any[]; 
			if (data.length === 0) {
				data = [{Source: 'no data', Target: ''}] as any[];
			} else {
				const keys = Object.keys(data[0]);
				data = data.map(row => { 
					return { Source: row[keys[0]], Target: row[keys[1]] };
				});
			}
			// NEED to parse the body into an array of {target source} elements
			console.log(response.body, data);
			this.previewTableData = new MatTableDataSource(data);
		})
		.catch(error => {
			console.error(error);
		});
	}

	onDownload(){

	}
}
