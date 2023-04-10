import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ModelQuerierComponent } from './model-querier/model-querier.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
		ModelQuerierComponent
	],
  imports: [
    CommonModule,
		SharedModule,
		MatMenuModule,
		MatButtonModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		
  ]
})
export class QuerierModule { }
