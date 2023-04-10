import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelQuerierComponent } from './querier/model-querier/model-querier.component';

const routes: Routes = [
	{ path: 'querier', component: ModelQuerierComponent },

	{ path: '', redirectTo: 'querier', pathMatch: 'full'}
];

@NgModule({
  imports: [
		RouterModule.forRoot(routes, {
			anchorScrolling: 'enabled',
			scrollPositionRestoration: 'enabled'
		})
	],
  exports: [RouterModule]
})
export class AppRoutingModule { }
