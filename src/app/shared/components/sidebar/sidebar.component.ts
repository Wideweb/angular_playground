import { Component, OnInit } from '@angular/core';
import { MenuItem } from './models/menu-item';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	menuItems: Array<MenuItem>;

	constructor(private router: Router) {
		this.menuItems = [];

		let homeItem = new MenuItem('Home', '/home', 'fa-home');

		let dashboardItem = new MenuItem('Dashboard', '/dashboard', 'fa-briefcase');
		let heroesItem = new MenuItem('Heroes', '/heroes', 'fa-users');
		let heroesSubMenu = new MenuItem('Heroes', null, 'fa-gavel', [dashboardItem, heroesItem]);

		this.menuItems.push(homeItem, heroesSubMenu);

		router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(_ => this.onRouterStateChanged());
	}

	onRouterStateChanged() {
		this.menuItems = this.menuItems.map((item) => {
			console.log('onRouterStateChanged');
			item.isCollapsed = !this.isItemActive(item);
			return item;
		});
	}

	isItemActive(item: MenuItem): boolean {
		return (!!item.routerLink && this.router.isActive(item.routerLink, true))
			|| this.hasActiveChildItem(item);
	}

	hasActiveChildItem(item: MenuItem): boolean {
		return !!item.submenu && item.submenu.some(i => this.isItemActive(i));
	}

	navigateTo(item: MenuItem) {
		!!item.routerLink && this.router.navigateByUrl(item.routerLink);
	}

	ngOnInit() {
	}

}
