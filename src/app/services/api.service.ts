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
  private activiteiten: ApiResult<Date>[] = [];
  private activiteitenToekomst: ApiResult<Date>[] = [];


  constructor(private http: HttpClient) {
    this.loadData().then(response => this.filterenOpDatum());

    // this.filterenOpDatum();
    console.log('Toekomstige act', this.activiteitenToekomst);

  }

  getActiviteiten(): ApiResult<Date>[] {
    return this.activiteitenToekomst;
  }

  getActiviteitViaId(id: string, i: number): Activiteit<Date> {
    // return this.getActiviteiten().find(x=>x.activiteiten.find(y=>y._id === id))?.activiteiten.find(y=>y._id === id);
    console.log('i', i);
    return this.getActiviteiten()[i]?.activiteiten.find(y => y._id === id);
  }

  getDatumViaI(i: number): ApiResult<Date> {
    return this.getActiviteiten()[i];
  }

  // getDatumViaZoekTerm(zoekterm: string): ApiResult {
  //   console.log(zoekterm);
  //   return this.getActiviteiten().find(x => x.datum.toString() === zoekterm);
  // }

  getHuidigeActiviteit(): Activiteit<Date> {
    const huidigetijd = new Date().toJSON().substring(11);
    // console.log(new Date().toJSON().substring(0,10));
    return this.getActiviteiten().find(x => x.datum.toString().substring(0, 10) === new Date().toJSON().substring(0, 10))
      ?.activiteiten.find(y => y.beginTijd.toString().substring(11) <= huidigetijd && y.eindTijd.toString().substring(11) > huidigetijd);
  }

  // getUitgelichteActiviteiten(): Activiteit{
  //
  // }

  private async loadData(): Promise<void> {
    this.activiteiten = await this.http
      .get<ApiResult<string>[]>(
        `${this.baseURL}/datum`,
        {
          observe: 'body',
          responseType: 'json',
        }
      )
      // De datum die je uit de database terugkrijgt, is in string formaat,
      // maar moet omgevormd worden een Date object.
      // Dit kan via de new Date() constructor.
      // Het ApiResult type is generisch, de generische parameter geeft het
      // type van de datum aan, ofwel string ofwel Date.
      .pipe(
        map<ApiResult<string>[], ApiResult<Date>[]>(results => this.convertStringResultToDateResult(results))
      )
      .toPromise();
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

  private convertStringResultToDateResult(results: ApiResult<string>[]): ApiResult<Date>[] {
    const converted: ApiResult<Date>[] = [];

    for (const r of results) {
      const activiteiten = r.activiteiten.map(a => ({
          ...a,
          beginTijd: new Date(a.beginTijd),
          eindTijd: new Date(a.eindTijd)
        }));
      converted.push({
        _id: r._id,
        activiteiten,
        datum: new Date(r.datum)
      });

    }
    return converted;
  }
}
