import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuerierModule } from './querier/querier.module';

import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
		HttpClientModule,
    BrowserModule,
    AppRoutingModule,
		QuerierModule,
		MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
