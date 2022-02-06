import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentData
} from '@angular/fire/compat/firestore';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from './../../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection: AngularFirestoreCollection<User>;
  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection('users');
  }
  getUser = (userid?: string) => this.userCollection.doc(userid).valueChanges();

  
  getInitialSubscription(userid: string): Observable<DocumentData[]> {
    const userDoc = this.userCollection.doc(userid);
    return userDoc.collection('interestCenter').valueChanges();
  }

  async getInterestCenter(userid: string): Promise<Category[]> {
    const userDoc = this.afs.firestore.collection('users').doc(userid);
    const interestCenters = await userDoc.collection('interestCenter').get();
    return interestCenters.docs.map((doc) => {
      const data = doc.data() as Category;
      const id = doc.id;
      return { id, ...data };
    });
  }

  setInterestCenter(userID: string, category: Category): Promise<void> {
    const userDoc = this.userCollection.doc(userID);
    return userDoc.collection('interestCenter').doc(category.id).set(category);
  }

  deleteInterestCenter(userID: string, category: Category): Promise<void> {
    const userDoc = this.userCollection.doc(userID);
    return userDoc.collection('interestCenter').doc(category.id).delete();
  }

  newUser(user: User): Promise<void> {
    const defaultInterestCenter = {
      categoryName: 'Google Tech',
      categoryColor: '#ff91f9',
    };
    const userDoc = this.userCollection.doc(`${user.id}`);
    userDoc.collection('interestCenter').add(defaultInterestCenter);
    return userDoc.set(user);
  }

  updateUserProfileImg(urlImg: string, userID?: string): Promise<void> {
    return this.userCollection.doc(userID).update({ imgProfil: urlImg });
  }

  updateUserProfilInfo(userInfo: User, userID?: string): Promise<void> {
    return this.userCollection.doc(userID).update(userInfo);
  }

}
