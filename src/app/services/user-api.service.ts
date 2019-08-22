import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private afs: AngularFirestore) { }
  private usersCollection: AngularFirestoreCollection<UserInterface>;
  private users: Observable<UserInterface[]>;
  private userDoc: AngularFirestoreDocument<UserInterface>;
  private user: Observable<UserInterface>;
   public selectedUser: UserInterface = {
    id: null,
  };
  getAllUsers() {
    this.usersCollection = this.afs.collection<UserInterface>('users');
    return this.users = this.usersCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as UserInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  addUser(user: UserInterface): void {
    this.usersCollection.add(user);
  }
  updateUser(user: UserInterface): void {
    const idUser = user.id;
    this.userDoc = this.afs.doc<UserInterface>(`users/${idUser}`);
    this.userDoc.update(user);
  }
  deleteUser(idUser: UserInterface): void {
    this.userDoc = this.afs.doc<UserInterface>(`users/${idUser}`);
    this.userDoc.delete();
  }
}
