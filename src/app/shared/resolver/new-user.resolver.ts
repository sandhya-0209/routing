import { inject, Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsersService } from '../services/users.service';
import { SnackbarService } from '../services/snackbar.service';
import { Iuser } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class NewUserResolver implements Resolve<Observable<Iuser | Array<Iuser> | null>> {
  private _usersService = inject(UsersService)
  private _snackBarSevice = inject(SnackbarService)
  private _router = inject(Router)
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Iuser |
   Array<Iuser> | null> {
    let userId : string | null = route.paramMap.get('userId')
    if(userId){
      let user = this._usersService.getUser(userId)
      if(user){
        return user;
      }else{
        this._snackBarSevice.openSnackBar(`User with Id ${userId} not found`);
        this._router.navigate(['users'])
        return of(null)
      }
    }else{
      return this._usersService.fetchUsers()
    }
  }
}
