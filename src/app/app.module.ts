import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuerierModule } from './querier/querier.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
		HttpClientModule,
    BrowserModule,
    AppRoutingModule,
		QuerierModule,
		SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
