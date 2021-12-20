import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {Observable} from 'rxjs';
import {ApiResult} from '../../types/apiResult';

@Component({
  selector: 'app-animatie',
  templateUrl: './animatie.page.html',
  styleUrls: ['./animatie.page.scss'],
})
export class AnimatiePage implements OnInit {

  constructor(public apiService: ApiService) {}

  ngOnInit() {
  }
}
