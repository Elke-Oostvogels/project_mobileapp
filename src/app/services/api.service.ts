import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResult} from '../../types/apiResult';
import {map} from 'rxjs/operators';
import {Activiteit} from '../../types/activiteit';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly baseURL = 'https://api-animatie.netlify.app/.netlify/functions/api';

 private activiteiten: ApiResult[] =[];
  constructor(private http: HttpClient) {
    this.loadData();
  }

  getActiviteiten(): ApiResult[]{
return this.activiteiten;
  }

  getActiviteitViaId(id: string, i: number): Activiteit{
    // return this.getActiviteiten().find(x=>x.activiteiten.find(y=>y._id === id))?.activiteiten.find(y=>y._id === id);
     return this.getActiviteiten()[i]?.activiteiten.find(y=>y._id === id);
  }

 private async loadData(): Promise<void>{
    this.activiteiten = await this.http
      .get<ApiResult[]>(
        `${this.baseURL}/datum`,
        {
          observe: 'body',
          responseType: 'json'
        }
      ).toPromise();
    console.log(this.activiteiten);
  }


 }
