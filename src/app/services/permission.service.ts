import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class PermissionService {

	constructor(
		private authService: AuthService
	) { }

	getUserPermissions(): string[] {
		if (!this.authService.isAuthenticated()) {
			return [];
		}

		return this.authService.getUserData().permissions;
	}

	hasPermission(permission: string): boolean {
		return this.getUserPermissions().some(p => p.toLowerCase == permission.toLowerCase);
	}
}
