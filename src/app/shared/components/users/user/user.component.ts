import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iuser } from 'src/app/shared/models/users';
import { UsersService } from 'src/app/shared/services/users.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit,OnDestroy {
  userId !: string;
  userObj !: Iuser;
  userSub !: Subscription
  constructor(
    private _usersService : UsersService,
    private _routes : ActivatedRoute,
    private _matDialog : MatDialog
  ) {
    _routes.data.subscribe(res=>{
      this.userObj = res['user']
    })
   }

  ngOnInit(): void {
    // this._routes.params
    //  .subscribe((params:Params)=>{
    //   this.userId = params['userId']
    //   this.userSub = this._usersService.getUser(this.userId)
    //    .subscribe(res=>{
    //     this.userObj = res
    //    })
    //  })
  }

  OnUserRemove(){
    const matDailogRef = this._matDialog.open(GetConfirmComponent)
    matDailogRef.afterClosed()
     .subscribe(res=>{
      if(res){
        this._usersService.removeUser(this.userObj)
      }
     })
  }

   ngOnDestroy(): void {
    this.userSub?.unsubscribe()
  }

}
