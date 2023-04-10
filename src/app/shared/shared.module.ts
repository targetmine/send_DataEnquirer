import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelDisplayComponent } from './components/model-display/model-display.component';



@NgModule({
  declarations: [
		ModelDisplayComponent
	],
  imports: [
    CommonModule
  ],
	exports: [
		ModelDisplayComponent
	]
})
export class SharedModule { }
