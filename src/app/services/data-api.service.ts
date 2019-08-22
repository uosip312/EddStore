import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ItemInterface } from '../models/item';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore) { }
  private itemsCollection: AngularFirestoreCollection<ItemInterface>;
  private items: Observable<ItemInterface[]>;
  private itemDoc: AngularFirestoreDocument<ItemInterface>;
  private item: Observable<ItemInterface>;
  public selectedItem: ItemInterface = {
    id: null
  };

  getAllItems() {
    this.itemsCollection = this.afs.collection<ItemInterface>('items');
    return this.items = this.itemsCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as ItemInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }
  getOneItem(idItem: string) {
    this.itemDoc = this.afs.doc<ItemInterface>(`items/${idItem}`);
    return this.item = this.itemDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as ItemInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }
  addItem(item: ItemInterface): void {
    this.itemsCollection.add(item);
  }
  updateItem(item: ItemInterface): void {
    const idItem = item.id;
    this.itemDoc = this.afs.doc<ItemInterface>(`items/${idItem}`);
    this.itemDoc.update(item);
  }
  deleteItem(idItem: ItemInterface): void {
    this.itemDoc = this.afs.doc<ItemInterface>(`items/${idItem}`);
    this.itemDoc.delete();
  }
}
