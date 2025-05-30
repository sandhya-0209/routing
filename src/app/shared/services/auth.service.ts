import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ILogInUser, IRegisterUser } from '../models/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_URL : string = `${environment.authurl}`;
  registerUrl : string = `${this.AUTH_URL}/api/auth/register`;
  logInUrl : string = `${this.AUTH_URL}/api/auth/login`
  constructor(
    private _hhtpClient : HttpClient,
    private _router : Router
  ) { }

  register(userDetails:IRegisterUser):Observable<any>{
     return this._hhtpClient.post<any>(`${this.registerUrl}`,userDetails)
  }

 logIn(userDetails:ILogInUser):Observable<any>{
     return this._hhtpClient.post<any>(`${this.logInUrl}`,userDetails)
  }

  saveToken(token : string){
    localStorage.setItem('token',token)
  }

  saveUserRole(userRole:string){
    localStorage.setItem('userRole',userRole)
  }

  getToken() : string | null {
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this._router.navigate([''])
  }
} 
