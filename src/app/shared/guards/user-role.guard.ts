import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
  private _router = inject(ActivatedRoute)
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let logInUser : string = localStorage.getItem('userRole')!;
    let arrOfUserRole : Array<string> = route.data['userRoles']
  
    return arrOfUserRole.includes(logInUser)

  }
  
}
