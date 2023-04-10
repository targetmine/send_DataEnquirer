import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelDisplayComponent } from './components/model-display/model-display.component';

import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
		ModelDisplayComponent
	],
  imports: [
    CommonModule,
		MatTableModule
  ],
	exports: [
		ModelDisplayComponent
	]
})
export class SharedModule { }
