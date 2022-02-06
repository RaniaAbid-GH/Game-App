import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

//type UserCredential = Promise<firebase.default.auth.UserCredential>;


export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  createNewUser(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }



  //login(email: string, password: string) {
   // return this.afAuth.signInWithEmailAndPassword(email, password);
  //}

 // resetPassword(email: string): Promise<void> {
  //  return this.afAuth.sendPasswordResetEmail(email);
  //}

  logOut(): void {
    this.afAuth.signOut();
    this.router.navigate(['landingPage']);
  }
  
}