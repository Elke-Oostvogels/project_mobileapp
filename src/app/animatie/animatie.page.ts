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

  async zoekenOpwijzigingHandler(event: any): Promise<void>{
    this.zoekterm = event.detail.value;
    await this.ophalenDatums(true);
  }

  ngOnInit() {
  }

  private async  ophalenDatums(reset =false): Promise<void>{
    const result = await this.apiService.getActiviteiten();

  }
}
