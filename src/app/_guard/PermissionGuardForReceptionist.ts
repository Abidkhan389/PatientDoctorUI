import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenHelper } from '../_common';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuardForReceptionist implements CanActivate {
    user=TokenHelper.getUserName();
  constructor(public router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return this.loginservice.currentUser.roleName.include(route.data['roleName']);
    const requiredRoles = ['Doctor', 'Admin','Receptionist'];
    if (this.user && requiredRoles.includes(this.user.role)) {
      return true;
    } else {
      return this.router.navigate(['/AccessDenied']);
    }
  }
  
}
