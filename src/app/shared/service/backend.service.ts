import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { Element, Model } from 'src/app/shared/models/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
		private http: HttpClient
	) { }

	public getModel(): Promise<HttpResponse<Model>>{
		const url = `${environment.serverURL}/querier/model/`;
		return firstValueFrom(this.http.get<Model>(url, {
			headers: {'Content-type': 'application/json'},
			observe: 'response'
		}));
	}

	public getElement(name: string, atts: string[], limit?: number): Promise<HttpResponse<Object>>{
		let url = `${environment.serverURL}/querier/element/${name}?`;
		atts.forEach(a => url += `&attr=${a}`)
		url += limit? `&rows=${limit}` : '';
		return firstValueFrom(this.http.get(url, {
			headers: { 'Content-type': 'application/json' },
			observe: 'response'
		}));
	}
	
	public getRelation(): Promise<HttpResponse<Object>>{
		const url =`${environment.serverURL}/querier/relation`;
		return firstValueFrom(this.http.get(url, {
			headers: {'Content-type': 'application/json'},
			observe: 'response'
		}));
	}
}
