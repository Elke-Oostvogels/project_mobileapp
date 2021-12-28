import {collection, Firestore, CollectionReference, getDocs, query, orderBy, addDoc} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {Info} from '../../types/info';
import {Inschrijving} from '../../types/inschrijving';

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

  async sendInschrijving(aantalpersonen: number, id: string): Promise<void>{
    const nieuweInschrijving= {
      aantalPers: aantalpersonen,
      activiteitId: id
    };
   const info = await addDoc<Inschrijving>(
      this.getCollectionRef<Inschrijving>('Inschrijvingen'),nieuweInschrijving
    );
   console.log(info);
  }

  private getCollectionRef<T>(collectionName: string): CollectionReference<T>{
    return collection(this.fireStore, collectionName) as CollectionReference<T>;
  }
}
