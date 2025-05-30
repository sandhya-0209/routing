import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private _authService = inject(AuthService)
  private _router = inject(Router)
  private _snackBar = inject(SnackbarService)
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this._authService.getToken()){
        return true
      }else{
        this._snackBar.openSnackBar(`plzzz log in first!!!`)
        return this._router.createUrlTree([''])
      }
  }
  
}
