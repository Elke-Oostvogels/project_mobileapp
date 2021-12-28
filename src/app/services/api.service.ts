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
  private activiteiten: ApiResult[] = [];
  private activiteitenToekomst: ApiResult[] = [];


  constructor(private http: HttpClient) {
    this.loadData().then(response => this.filterenOpDatum());

    // this.filterenOpDatum();
    console.log('Toekomstige act',this.activiteitenToekomst);

  }

  getActiviteiten(): ApiResult[] {
    return this.activiteitenToekomst;
  }

  getActiviteitViaId(id: string, i: number): Activiteit {
    // return this.getActiviteiten().find(x=>x.activiteiten.find(y=>y._id === id))?.activiteiten.find(y=>y._id === id);
    console.log('i', i);
    return this.getActiviteiten()[i]?.activiteiten.find(y => y._id === id);
  }

  getDatumViaI(i: number): ApiResult {
    return this.getActiviteiten()[i];
  }

  // getDatumViaZoekTerm(zoekterm: string): ApiResult {
  //   console.log(zoekterm);
  //   return this.getActiviteiten().find(x => x.datum.toString() === zoekterm);
  // }

    getHuidigeActiviteit(): Activiteit{
    const huidigetijd = new Date().toJSON().substring(11);
    // console.log(new Date().toJSON().substring(0,10));
    return this.getActiviteiten().find(x=>x.datum.toString().substring(0,10) === new Date().toJSON().substring(0,10))
      ?.activiteiten.find(y=>y.beginTijd.toString().substring(11) <= huidigetijd && y.eindTijd.toString().substring(11) > huidigetijd);
  }

  // getUitgelichteActiviteiten(): Activiteit{
  //
  // }

  private async loadData(): Promise<void> {
    this.activiteiten = await this.http
      .get<ApiResult[]>(
        `${this.baseURL}/datum`,
        {
          observe: 'body',
          responseType: 'json',
        }
      ).toPromise();
  }

  private async filterenOpDatum(): Promise<void> {
    for (const activiteit of this.activiteiten) {
      const date = activiteit.datum;
      const today = new Date().toJSON();
      if (date.toString() > today) {
        this.activiteitenToekomst.push(activiteit);
      }
    }
    console.log(this.activiteitenToekomst);
  }
}
