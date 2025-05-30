import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ICandeactivate } from '../models/candeactive';

@Injectable({
  providedIn: 'root'
})
export class CanDeactiveGuard implements CanDeactivate<ICandeactivate> {
  canDeactivate(
    component: ICandeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactive();
  }
  
}
