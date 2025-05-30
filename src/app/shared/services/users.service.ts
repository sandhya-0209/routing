import { Injectable } from '@angular/core';
import { Iuser } from '../models/users';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userArr : Array<Iuser> = [
    {
      userName : 'John Doe',
      userId : '121',
      userRole : 'Admin'
    },
    {
      userName : 'Jen Doe',
      userId : '122',
      userRole : 'Candidate'
    },
    {
      userName : 'May Doe',
      userId : '123',
      userRole : 'Admin'
    }
  ]
  constructor(
    private _router : Router,
    private _snackBar : SnackbarService
  ) { }

  fetchUsers() : Observable<Iuser[]>{
    return of(this.userArr)
  }

  addUser(userObj:Iuser){
    this.userArr.push(userObj)
    this._snackBar.openSnackBar(`The user with userName ${userObj.userName} is added successfully!!!`)
    this._router.navigate(['users'])
  }

  getUser(id:string):Observable<Iuser>{
    let user = this.userArr.find(user=> user.userId === id)!;
    return of(user)
  }

  updatedObj(updatedObj:Iuser){
  let getIndex= this.userArr.findIndex(user=>user.userId === updatedObj.userId)
  this.userArr[getIndex] = updatedObj;
  this._snackBar.openSnackBar(`The userName ${updatedObj.userName} is updated successfully!!!`)
  this._router.navigate(['users'])
  }

  removeUser(userObj:Iuser){
    let getIndex= this.userArr.findIndex(user=>user.userId === userObj.userId)
    this.userArr.splice(getIndex,1)
    this._snackBar.openSnackBar(`The user with userName ${userObj.userName} is deleted successfully!!!`)
    this._router.navigate(['users'])
  }
}
