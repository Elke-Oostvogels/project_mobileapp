import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
  private uitgelichteActiviteiten: Activiteit<Date>[] = [];
  private huidigeActiviteiten: Activiteit<Date>[] = [];
  private activiteitenToday: ApiResult<Date>;

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.loadData().then(response => this.filterenOpDatum());
  }

  getActiviteiten(): ApiResult<Date>[] {
    return this.activiteitenToekomst;
  }

  getActiviteitViaId(id: string, i: number): Activiteit<Date> {
    // return this.getActiviteiten().find(x=>x.activiteiten.find(y=>y._id === id))?.activiteiten.find(y=>y._id === id);
    // eslint-disable-next-line no-underscore-dangle
    return this.getActiviteiten()[i]?.activiteiten.find(y => y._id === id);
  }

  getDatumViaI(i: number): ApiResult<Date> {
    return this.getActiviteiten()[i];
  }

  listUitgelichteActiviteiten(): Activiteit<Date>[] {
    return this.uitgelichteActiviteiten;
  }

  listHuidigeActiviteiten(): Activiteit<Date>[] {
    return this.huidigeActiviteiten;
  }

  // getDatumViaZoekTerm(zoekterm: string): ApiResult {
  //   console.log(zoekterm);
  //   return this.getActiviteiten().find(x => x.datum.toString() === zoekterm);
  // }

  private async getHuidigeActiviteit(): Promise<Activiteit<Date>[]> {

    for (const act of this.activiteitenToday.activiteiten) {
      const now = new Date();
      // @ts-ignore
      const begintijd = new Date().setTime(act.beginTijd);

      // @ts-ignore
      const eindtijd = act.eindTijd.toISOString().substring(10,24);
      const today = now.toISOString().substring(0,10);

      const eindtijd2 = new Date(new Date(today + eindtijd).getTime()-3600000);
//    const time = this.beginTijd.toISOString().substring(10,24);
      //new Date(date + time)
      console.log(now);
      console.log(eindtijd2);
      if (now.getTime() > begintijd) {
        if (eindtijd2.getTime() > now.getTime()) {
          this.huidigeActiviteiten.push(act);
        }
      }
    }

    return this.huidigeActiviteiten;
  }


  private async getUitgelichteActiviteiten(): Promise<Activiteit<Date>[]> {
    for (const act of this.activiteitenToday.activiteiten) {
      if (act.uitgelicht === true) {
        this.uitgelichteActiviteiten.push(act);
      }
    }
    return this.uitgelichteActiviteiten;
  }

  private async getApiResultToday(): Promise<void> {
    const today = new Date();
    this.activiteitenToday = await this.activiteitenToekomst.find(x => x.datum.toLocaleDateString() === today.toLocaleDateString());
    await this.getUitgelichteActiviteiten();
    await this.getHuidigeActiviteit();
  }

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
      const today = new Date();
      if (date >= today) {
        this.activiteitenToekomst.push(activiteit);
      }
    }
    await this.getApiResultToday();
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
        // eslint-disable-next-line no-underscore-dangle
        _id: r._id,
        activiteiten,
        datum: new Date(r.datum)
      });

    }
    return converted;
  }
}
