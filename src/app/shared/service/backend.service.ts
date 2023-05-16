import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

	public getModel(){
		const url = `${environment.serverURL}/querier/model/`;
		return firstValueFrom(this.http.get<Model>(url, {
			headers: {'Content-type': 'application/json'},
			observe: 'response'
		}));
	}

	public getElement(ele: Element){
		const url = `${environment.serverURL}/querier/element/${ele.name}`;
		return firstValueFrom(this.http.get(url,{
			headers: { 'Content-type': 'application/json' },
			observe: 'response'
		}));
	}
}
