import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Iuser } from 'src/app/shared/models/users';
import { CustomRegex } from 'src/app/shared/models/validators';
import { UsersService } from 'src/app/shared/services/users.service';
import { UuidService } from 'src/app/shared/services/uuid.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  isInEditMode : boolean = false;
  userId !: string;
  usersForm !: FormGroup;
  updatedBtnDisabled : boolean = false;
  constructor(
    private _routes : ActivatedRoute,
    private _usersService : UsersService,
    private _uuid : UuidService
  ) { }

  ngOnInit(): void {
    this.createUserForm();
    this.setInEditMode()
  }

  createUserForm(){
     this.usersForm = new FormGroup({
      userName : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.onlyText)]),
      userRole : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.onlyText)])
     })
  }

  get f(){
    return this.usersForm.controls;
  }

  setInEditMode(){
     this.userId = this._routes.snapshot.params['userId']
     if(this.userId){
      this.isInEditMode = true;
      this._usersService.getUser(this.userId)
       .subscribe(user=>{
        this.usersForm.patchValue(user)
       })
     }
     if(this._routes.snapshot.queryParams['userRole'] === 'Candidate'){
       this.usersForm.disable()
       this.updatedBtnDisabled = true
     }
  }

  onUserSubmit(){
    if(this.usersForm.valid){
        if(!this.isInEditMode){
          let newUser ={...this.usersForm.value, userId: this._uuid.generateUuid()}
          this.usersForm.reset()
          this._usersService.addUser(newUser)
        }else{
           let updatedUser : Iuser = {...this.usersForm.value, userId:this.userId}
           this._usersService.updatedObj(updatedUser)
           this.isInEditMode = true
           this.usersForm.reset()
        }
    }
  }

  canDeactive(){
    if(this.usersForm?.dirty && this.isInEditMode){
      let getConfirm = confirm(`Are you sure you want to discard these changes?`)
      return getConfirm;
    }
    return true;
  }
}
