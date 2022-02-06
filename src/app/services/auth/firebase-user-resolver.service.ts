import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import {User} from '@firebase/auth-types';

@Injectable({
  providedIn: 'root'
})
export class FirebaseUserResolverService
  implements Resolve<Observable<User>> {
  constructor(private afAuth: AngularFireAuth) {}

  resolve(): any {
    return this.afAuth.user.pipe(
      filter((user) => user !== undefined),
      take(1)
    );
  }
}