import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BackendService } from '../../service/backend.service';
import { ModelService } from '../../service/model.service';
import { ModelNode } from 'src/app/shared/models/model';

@Component({
  selector: 'app-relation-preview-table',
  templateUrl: './relation-preview-table.component.html',
  styleUrls: ['./relation-preview-table.component.css']
})
export class RelationPreviewTableComponent implements OnInit {
	@Input() relation!: ModelNode;

	@ViewChild('previewTable')
	previewTable!: MatTable<any[]>
	previewTableData: MatTableDataSource<any> = new MatTableDataSource<any>();
	previewTableColumns: string[] = ['Source', 'Target'];

	constructor(
		public readonly backendService: BackendService,
		public readonly modelService: ModelService
	){ }

	ngOnInit(): void {
			
	}

	onPreview(){

	}

	onDownload(){
		
	}
}
