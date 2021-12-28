import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-animatie',
  templateUrl: './animatie.page.html',
  styleUrls: ['./animatie.page.scss'],
})
export class AnimatiePage implements OnInit {

  zoekterm ='';
  constructor(public apiService: ApiService) {}

  // async zoekenOpDatumHandler(event: any): Promise<void>{
  //   this.zoekterm = event.detail.value;
  //   console.log(this.zoekterm);
  //   await this.ophalenDatums(this.zoekterm);
  // }

  ngOnInit() {
  }

  // private async  ophalenDatums(zoekterm: string): Promise<void>{
  //   await this.apiService.getDatumViaZoekTerm(zoekterm);
  // }
}
