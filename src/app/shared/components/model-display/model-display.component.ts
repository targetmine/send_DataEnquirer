import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource} from '@angular/material/table';

import { Element } from '../../models/element';
import { Relation } from '../../models/relation';

@Component({
  selector: 'app-model-display',
  templateUrl: './model-display.component.html',
  styleUrls: ['./model-display.component.css']
})
export class ModelDisplayComponent implements OnInit{
	
	elements: MatTableDataSource<Element> = new MatTableDataSource<Element>();
	relations: MatTableDataSource<Relation> = new MatTableDataSource<Relation>();

	@ViewChild('elementsTable')
	elementTable!: MatTable<Element[]>;
	elementTableColumns: string[] = ['elements', 'attributes'];

	@ViewChild('relationsTable')
	relationTable!: MatTable<Relation[]>;
	relationTableColumns: string[] = ['source', 'target', 'cardinality'];


	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}
}
