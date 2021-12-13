import {collection, Firestore, CollectionReference, getDocs, query, orderBy} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {Info} from '../../types/info';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor( private fireStore: Firestore) {
  }

  async retrieveInfoAsSnapshot(col: string): Promise<{ leeftijdscat: string; prijs: number }[]>{
    const results = await getDocs<Info>(
      query<Info>(this.getCollectionRef(col),
        orderBy('prijs'))
    );
    console.log(results);
    return  results.docs.map(d => ({...d.data(), key: d.id}));
  }

  private getCollectionRef<T>(collectionName: string): CollectionReference<T>{
    return collection(this.fireStore, collectionName) as CollectionReference<T>;
  }
}
