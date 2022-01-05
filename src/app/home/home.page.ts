import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Activiteit} from '../../types/activiteit';
import {DatabaseService} from '../services/database.service';
import {NetworkService} from '../services/network.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  inschrijvingSafari: { aantalPers: number; date: string; bedr: number }[] = [];
  inschrijvingActiviteit: { aantalPers: number; activiteitId: string; naam: string; datum: string; beginTijd: string }[]= [];

  constructor(public apiService: ApiService, private dbServise: DatabaseService, public networkservice: NetworkService) {
    // dbServise.retrieveInschrijvingSafari('InschrijvingenSafari').then(i => this.inschrijvingSafari = i);
    dbServise.retrieveInschrijvingSafariRealTime('InschrijvingenSafari', (inschrijving)=>this.inschrijvingSafari = inschrijving);
    dbServise.retrieveInschrijvingActiviteitRealTime('InschrijvingenAnimatie', (inschrijving)=>this.inschrijvingActiviteit = inschrijving);
    // dbServise.retrieveInschrijvingActiviteit('InschrijvingenAnimatie').then(i => this.inschrijvingActiviteit = i);
  }

  ngOnInit(): void {
    // this.networkservice.network();
  }
}
