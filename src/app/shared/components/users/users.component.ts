import { Component, OnDestroy, OnInit } from '@angular/core';
import { Iuser } from '../../models/users';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit,OnDestroy{
  userArr : Array<Iuser> = [];
  userSub !: Subscription;
  constructor(
    private _usersService : UsersService,
    private _routes : ActivatedRoute,
    private _router : Router
  ) { 
    this.userArr = this._routes.snapshot.data['users']
     this._router.navigate([this.userArr[0].userId],{
        relativeTo : this._routes,
        queryParams : {
          userRole : this.userArr[0].userRole
        }
      })
  }

  ngOnInit(): void {
    // this.getUsers()
  }

  // getUsers(){
  //   this.userSub = this._usersService.fetchUsers()
  //     .subscribe(user=>{
  //       this.userArr = user
  //     })

  //     this._router.navigate([this.userArr[0].userId],{
  //       relativeTo : this._routes,
  //       queryParams : {
  //         userRole : this.userArr[0].userRole
  //       }
  //     })
  // }

   ngOnDestroy(): void {
   this.userSub?.unsubscribe()
  }


}
