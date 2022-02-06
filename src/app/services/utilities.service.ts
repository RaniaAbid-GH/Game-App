import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  game_name="GAME NAME";
  description= "This is a description for the game";

  constructor(private snackBar: MatSnackBar ) { }

  showNotification(
    msg: string,
    btnTxt?: string
  ): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(msg, btnTxt, {
      duration: 10000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
