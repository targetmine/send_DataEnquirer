import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModelDisplayComponent } from './components/model-display/model-display.component';
import { PreviewTableComponent } from './components/preview-table/preview-table.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
		ModelDisplayComponent,
  	PreviewTableComponent
	],
  imports: [
    CommonModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatTableModule,
		MatButtonModule,
		MatCheckboxModule,
		MatTreeModule,
		MatIconModule,
		MatProgressSpinnerModule
  ],
	exports: [
		ModelDisplayComponent,
		PreviewTableComponent
	]
})
export class SharedModule { }
