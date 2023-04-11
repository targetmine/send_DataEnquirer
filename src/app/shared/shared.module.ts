import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelDisplayComponent } from './components/model-display/model-display.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
		ModelDisplayComponent
	],
  imports: [
    CommonModule,
		MatTableModule,
		MatButtonModule,
		MatCheckboxModule
  ],
	exports: [
		ModelDisplayComponent
	]
})
export class SharedModule { }
