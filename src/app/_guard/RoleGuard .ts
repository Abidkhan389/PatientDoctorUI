import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { TokenHelper } from '../_common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  user = TokenHelper.getUserName();

  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot):  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRoles = route.data.requiredRoles as string[];
    if (this.user && requiredRoles.includes(this.user.role)) {
      return true;
    } else {
      this.router.navigate(['/AccessDenied']);
      return false;
    }
  }
}
