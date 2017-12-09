import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastsManager } from 'ng2-toastr';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private toastr: ToastsManager) { }

	canActivate() {
		if (this.authService.isAuthenticated()) {
			return true;
        }
        
        this.toastr.info('unauthorized');

        this.authService.loginRedirect();
		return false;
	}
}