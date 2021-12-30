import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {AlertController} from '@ionic/angular';
import {LocalNotification, LocalNotifications} from '@capacitor/local-notifications';
import {DatabaseService} from '../../services/database.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  _id: string;
  naam: string;
  icon: string;
  beginTijd: Date;
  eindTijd: Date;
  leeftijdscat: string;
  typeActiviteit: string;
  locatie: string;
  beschrijving: string;
  persLimiet: number;
  prijs: number;
  datumAct: Date;

  constructor(public activatedRoute: ActivatedRoute,
              public apiService: ApiService, private alertController: AlertController,
              private dbService: DatabaseService) {
  }

  async ngOnInit() {
    this.setData();
    await LocalNotifications.requestPermissions();
  }

  setData(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const datum = Number(this.activatedRoute.snapshot.paramMap.get('datum'));
    console.log('index nummer', datum);
    const activiteit = this.apiService.getActiviteitViaId(id, datum);

    // eslint-disable-next-line no-underscore-dangle
    this._id = activiteit._id;
    this.naam = activiteit.naam;
    this.leeftijdscat = activiteit.leeftijdscat;
    this.prijs = activiteit.prijs;
    this.beginTijd = activiteit.beginTijd;
    this.persLimiet = activiteit.persLimiet;
    this.eindTijd = activiteit.eindTijd;
    this.beschrijving = activiteit.beschrijving;
    this.locatie = activiteit.locatie;
    this.typeActiviteit = activiteit.typeActiviteit;
    this.datumAct = this.apiService.getDatumViaI(datum).datum;
    console.log(this.datumAct);

  }

  async alertInschrijvingen(): Promise<void> {
    if (this.persLimiet ==  null){
      const alert = await this.alertController.create({
        header: 'Inschrijven activiveit',
        message: 'Voor deze activiteit moet u zich niet inschrijven',
        buttons: [
          {
            text: 'Oke',
            role: 'cancel',
            cssClass: 'secondary'
          }
        ]
      });
      await alert.present();
    }
    else{
      const alert = await this.alertController.create({
        header: 'Inschrijven activiveit',
        buttons: [
          {
            text: 'Annuleren',
            role: 'cancel',
            cssClass: 'secondary'
          }, {
            text: 'OK',
            handler: (data) => {
              const aantal = data;
              console.log(aantal);
              // eslint-disable-next-line no-underscore-dangle
              this.dbService.sendInschrijvingActiviteit(data, this._id);
              this.bevestigingNotification();
            }
          }
        ],
        inputs: [
          {
            name: 'aantalPersonen',
            type: 'number',
            placeholder: 'Aantal personen'
          }
        ]
      });
      await alert.present();
    }
  }

  async bevestigingNotification() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Bevestiging inschrijving',
          body: 'Uw inschrijving is geaccepteerd voor ' + this.naam,
          id: 1,
        }
      ]
    });
  }

  async reminderActivity() {
    const time = this.beginTijd.toISOString().substring(10,24);
    const date = this.datumAct.toISOString().substring(0,10);
    const messager: LocalNotification= {
      title: this.naam,
      body: this.naam + ' deze activitiet start over 15 minuten aan ' + this.locatie,
      id: 1,
       // schedule: {at: new Date(new Date(this.datumAct).setTime(this.beginTijd.getTime())-(90*1000))}
       schedule: {at: new Date(new Date(date + time).getTime()-(4500*1000))}
    };
    LocalNotifications.schedule({
      notifications:[messager]});
  }
}
