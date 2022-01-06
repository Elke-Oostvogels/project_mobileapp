import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {NetworkService} from "../services/network.service";

@Component({
  selector: 'app-animatie',
  templateUrl: './animatie.page.html',
  styleUrls: ['./animatie.page.scss'],
})
export class AnimatiePage implements OnInit {

  zoekterm ='';
  constructor(public apiService: ApiService, public networkservice: NetworkService) {}

  // async zoekenOpDatumHandler(event: any): Promise<void>{
  //   this.zoekterm = event.detail.value;
  //   console.log(this.zoekterm);
  //   await this.ophalenDatums(this.zoekterm);
  // }

  ngOnInit() {
    this.networkservice.network();
  }

  // private async  ophalenDatums(zoekterm: string): Promise<void>{
  //   await this.apiService.getDatumViaZoekTerm(zoekterm);
  // }
}
