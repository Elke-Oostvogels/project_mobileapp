import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(public apiService: ApiService) {
    console.log(apiService.getHuidigeActiviteit());
  }

  ngOnInit(): void {
  }

}
