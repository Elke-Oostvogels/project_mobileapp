import {collection, Firestore, CollectionReference, getDocs, query, orderBy, addDoc} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {Info} from '../../types/info';
import {InschrijvingActiviteit} from '../../types/inschrijvingActiviteit';
import {InschrijvingSafari} from '../../types/inschrijvingSafari';
import {SafariInfo} from "../../types/safariInfo";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private fireStore: Firestore) {
  }

  async retrieveInfoAsSnapshot(col: string): Promise<{ leeftijdscat: string; prijs: number }[]> {
    const results = await getDocs<Info>(
      query<Info>(this.getCollectionRef(col),
        orderBy('prijs'))
    );
    console.log(results);
    return results.docs.map(d => ({...d.data(), key: d.id}));
  }
  async retrieveDataInfoAsSnapshot(col: string): Promise<{ maanden: number[]; jaren: number[]; uren: number[]; dagen: number[]; plaatsen: number }[]> {
    const results = await getDocs<SafariInfo>(
      query<SafariInfo>(this.getCollectionRef(col))
    );
    console.log(results);
    return results.docs.map(d => ({...d.data(), key: d.id}));
  }


  async sendInschrijvingSafari(aantalpersonen: number, datum: Date,  bedrag: number): Promise<void> {
    const inschrijvingSafari = {
      aantalPers: aantalpersonen,
      date: datum,
      bedr: bedrag
    };
    const info = await addDoc<InschrijvingSafari>(
      this.getCollectionRef<InschrijvingSafari>('InschrijvingenSafari'), inschrijvingSafari
    );
    console.log(info);
  }

  async sendInschrijvingActiviteit(aantalpersonen: number, id: string): Promise<void> {
    const nieuweInschrijving = {
      aantalPers: aantalpersonen,
      activiteitId: id
    };
    const info = await addDoc<InschrijvingActiviteit>(
      this.getCollectionRef<InschrijvingActiviteit>('InschrijvingenAnimatie'), nieuweInschrijving
    );
    console.log(info);
  }

  private getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.fireStore, collectionName) as CollectionReference<T>;
  }
}
