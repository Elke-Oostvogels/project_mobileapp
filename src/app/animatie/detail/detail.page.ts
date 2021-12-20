import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {Time} from "@angular/common";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  naam: string;
  icon: string;
  beginTijd: Time;
  eindTijd: Time;
  leeftijfscat: string;
  typeActiviteit: string;
  locatie: string;
  beschrijving: string;
  persLimiet: string;
  prijs: number;

  constructor(public activatedRoute: ActivatedRoute, public apiService: ApiService) {
  }

  ngOnInit() {
    this.setData();
  }

  setData(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const datum = Number(this.activatedRoute.snapshot.paramMap.get('datum'));
    const activiteit = this.apiService.getActiviteitViaId(id, datum);

    this.naam = activiteit.naam;
    this.leeftijfscat = activiteit.leeftijfscat;
    this.prijs= activiteit.prijs;
    this.beginTijd = activiteit.beginTijd;
    this.beschrijving = activiteit.beschrijving;
    console.log(activiteit);
  }

}

