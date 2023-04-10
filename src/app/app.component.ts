import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'DataReusable - Enquirer';
	protected tabs: any[];
	private activeTabIndex: number = 0;

	constructor(private router: Router){
		this.tabs = [
			{ label: 'Model Querier', link: './querier', index: 0 }
		];
	}

	ngOnInit(): void {
		this.router.events.subscribe(() => {
			this.activeTabIndex = this.tabs.indexOf(
				this.tabs.find((t: {link: string; }) => t.link === `.${this.router.url}`)
			);
		});
	}
}
