import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Activiteit} from '../../types/activiteit';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  naam: string;
  locatie: string;
  _id: string;
  activiteit: Activiteit<Date>;
  constructor(public apiService: ApiService) {
  }
  ngOnInit(): void {
    console.log(this.apiService.listHuidigeActiviteiten().length);
  }
}
