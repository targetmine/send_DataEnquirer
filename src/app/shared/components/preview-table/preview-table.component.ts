import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BackendService } from '../../service/backend.service';

@Component({
  selector: 'app-preview-table',
  templateUrl: './preview-table.component.html',
  styleUrls: ['./preview-table.component.css']
})
export class PreviewTableComponent {

	@ViewChild('previewTable')
	previewTable!: MatTable<any[]>;
	previewTableData: MatTableDataSource<any> = new MatTableDataSource<any>();
	previewTableColumns: string[] = [];

	constructor(
		public readonly backendService: BackendService
	) {}



	onDownload(): void {
		throw new Error('need to implement this function');
	}

}
