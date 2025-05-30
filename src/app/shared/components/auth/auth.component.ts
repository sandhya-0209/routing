import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { CustomRegex } from '../../models/validators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  logInForm !: FormGroup;
  signUpForm !: FormGroup;
  alreadyHasAnAcc : boolean = false;
  constructor(
    private _authService : AuthService,
    private _snackBar : SnackbarService,
    private _router : Router
  ) { } 

  ngOnInit(): void {
    this.createLogInForm();
    this.createSignUpForm()
  }

  createLogInForm(){
    this.logInForm = new FormGroup({
         email : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.email)]),
         password : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.password)])
        })
  }

  createSignUpForm(){
   this.signUpForm = new FormGroup({
         email : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.email)]),
         password : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.password)]),
         userRole : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.onlyText)])
        })
  }

  get f(){
    return this.logInForm.controls;
  }

  get controls(){
    return this.signUpForm.controls
  }

   onRegister(){
    if(this.signUpForm.valid){
     let user = this.signUpForm.value;
     this.signUpForm.reset()
     this._authService.register(user)
      .subscribe({
        next :(res) =>{
           this._snackBar.openSnackBar(res.message)
           this._authService.saveToken(res.token)
           this.signUpForm.reset()
           this.alreadyHasAnAcc = true
        },
      error:(err)=>{
        this._snackBar.openSnackBar(err.error.message)
      }
      })
    }
  }

  onLogIn(){
    if(this.logInForm.valid){
       let user = this.logInForm.value;
       this._authService.logIn(user)
       .subscribe({
        next:(res) =>{
          this._snackBar.openSnackBar(res.message)
          this.logInForm.reset()
          this._authService.saveToken(res.token)
          this._authService.saveUserRole(res.userRole)
          this._router.navigate(['home'])
        },
        error:(err)=>{
        this._snackBar.openSnackBar(err.error.message)
      }
       })
    }
  }

}

