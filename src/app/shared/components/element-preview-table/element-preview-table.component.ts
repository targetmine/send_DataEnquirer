import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BackendService } from 'src/app/shared/service/backend.service';
import { ModelService } from 'src/app/shared/service/model.service';
import { ModelNode } from 'src/app/shared/models/model';

@Component({
  selector: 'app-element-preview-table',
  templateUrl: './element-preview-table.component.html',
  styleUrls: ['./element-preview-table.component.css']
})
export class ElementPreviewTableComponent implements OnInit {

	@Input() element!: ModelNode;
	
	@ViewChild('previewTable')
	previewTable!: MatTable<any[]>;
	previewTableData: MatTableDataSource<any> = new MatTableDataSource<any>();
	previewTableColumns: string[] = [];

	constructor(
		public readonly backendService: BackendService,
		public readonly modelService: ModelService
	) {	}

	ngOnInit(): void{
		// need to initialize columns on load
		this.previewTableColumns = this.element.children
			.filter(c => this.modelService.selectedElements$.isSelected(c))
			.map(c => c.name);
		// and update them in case of user interaction with the selection
		this.modelService.selectedElements$.changed.subscribe(() => {
			this.previewTableColumns = this.element.children
				.filter(c => this.modelService.selectedElements$.isSelected(c))
				.map(c => c.name);
		});
	}

	onPreview(){
		this.backendService.getElement(this.element.name, this.previewTableColumns, 10)
			.then(response => {
				const data = response.body ? 
					response.body as any[]:
					[] as any[];
				this.previewTableData = new MatTableDataSource(data);
			})
			.catch(error => {
				console.error(error);
			});
	}

	onDownload(): void {
		this.backendService.getElement(this.element.name, this.previewTableColumns)
		.then(response => {
			const data = response.body ?
				response.body as any[] :
				[] as any[];
			
			// specify how you want to handle null values here
			const replacer = (key: any, value: any) => value === null ? '' : value; 
			const header = Object.keys(data[0]);
			let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
			csv.unshift(header.join(','));
			const csvArray = csv.join('\r\n');
			let objectUrl = URL.createObjectURL(new Blob([csvArray], {type: "text/csv"}));
			const a = document.createElement('a');
			a.download = `data.csv`;
			a.href = objectUrl;
			a.click();
			URL.revokeObjectURL(objectUrl);	
		})
		.catch(error => {
			console.error(error);
		});
	}

}
