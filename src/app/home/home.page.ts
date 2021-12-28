import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {appCheckInstance$} from "@angular/fire/app-check";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  naam: string;
  locatie: string;
  _id: string;
  constructor(public apiService: ApiService) {
    console.log(apiService.getHuidigeActiviteit());
  }


  ngOnInit(): void {
    // this.setData();
  }

  setData(): void{
    const activiteit = this.apiService.getHuidigeActiviteit();

    // this.naam = activiteit.naam;
    // this._id = activiteit._id;
    this.locatie = activiteit.locatie;
    console.log(this.naam);
  }
}
