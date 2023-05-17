import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BackendService } from 'src/app/shared/service/backend.service';
import { ModelService } from 'src/app/shared/service/model.service';

@Component({
  selector: 'app-preview-table',
  templateUrl: './preview-table.component.html',
  styleUrls: ['./preview-table.component.css']
})
export class PreviewTableComponent implements OnInit {

	@Input() name!: string;
	@Input() type!: string;

	@ViewChild('previewTable')
	previewTable!: MatTable<any[]>;
	previewTableData: MatTableDataSource<any> = new MatTableDataSource<any>();
	previewTableColumns: string[] = [];

	constructor(
		public readonly backendService: BackendService,
		public readonly modelService: ModelService
	) {	}

	ngOnInit(): void{
		if(this.type === 'Element'){
			this.previewTableColumns = this.modelService.getElementAttributes(this.name);
			
		}
		else
			this.previewTableColumns = ['Source', 'Target'];
	}

	onPreview(){
		this.backendService.getModel()
			.then(response => console.log(response))
			.catch(error => {
				console.error(error);
			});
	}

	onDownload(): void {
		throw new Error('need to implement this function');
	}

}
