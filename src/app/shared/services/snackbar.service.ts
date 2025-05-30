import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _matSnackBar : MatSnackBar
  ) { }

  openSnackBar(msg: string){
    let configObj : MatSnackBarConfig<any> ={
      horizontalPosition : 'center',
      verticalPosition : 'top',
      duration : 3000
    }
    this._matSnackBar.open(msg,"close",configObj)
  }
}
