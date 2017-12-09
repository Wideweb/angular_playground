export class MenuItem {
	title: string;
	routerLink: string;
	icon: string;
	submenu: Array<MenuItem>;
	isCollapsed: boolean;

	constructor(title: string, routerLink:string, icon: string, submenu: Array<MenuItem> = null) {
		this.title = title;
		this.routerLink = routerLink;
		this.icon = icon;
		this.submenu = submenu;
		this.isCollapsed = true;
	}
}