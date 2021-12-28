import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {AlertController} from '@ionic/angular';
import {LocalNotification, LocalNotifications} from '@capacitor/local-notifications';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  naam: string;
  icon: string;
  beginTijd: Date;
  eindTijd: Date;
  leeftijdscat: string;
  typeActiviteit: string;
  locatie: string;
  beschrijving: string;
  persLimiet: string;
  prijs: number;
  datumAct: Date;

  constructor(public activatedRoute: ActivatedRoute, public apiService: ApiService, private alertController: AlertController) {}

  async ngOnInit() {
    this.setData();
    await LocalNotifications.requestPermissions();
  }

  setData(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const datum = Number(this.activatedRoute.snapshot.paramMap.get('datum'));
    const activiteit = this.apiService.getActiviteitViaId(id, datum);

    this.naam = activiteit.naam;
    console.log(this.naam);
    this.leeftijdscat = activiteit.leeftijdscat;
    this.prijs = activiteit.prijs;
    this.beginTijd = activiteit.beginTijd;
    this.eindTijd = activiteit.eindTijd;
    this.beschrijving = activiteit.beschrijving;
    this.locatie = activiteit.locatie;
    this.typeActiviteit = activiteit.typeActiviteit;
    this.datumAct = this.apiService.getDatumViaI(datum).datum;
  console.log(this.datumAct);
  }

  async alertInschrijvingen(): Promise<void> {
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

  async reminderActivity() {
    const messager: LocalNotification= {
      title: this.naam,
      body: this.naam + ' deze activitiet start over 15 minuten aan ' + this.locatie,
      id: 1,
      schedule: {at: new Date(this.beginTijd.setTime(this.beginTijd.getTime())-150000)}
    };
    LocalNotifications.schedule({
      notifications:[messager]});
  }
}
