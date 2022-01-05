import {Component, OnInit} from '@angular/core';
import {DatabaseService} from '../services/database.service';
import {Info} from '../../types/info';
import {AlertController} from '@ionic/angular';
import {Network} from '@capacitor/network';
import {PluginListenerHandle} from '@capacitor/core';
import {NetworkService} from '../services/network.service';

@Component({
  selector: 'app-safari',
  templateUrl: './safari.page.html',
  styleUrls: ['./safari.page.scss'],
})
export class SafariPage implements OnInit {
  // variable form reservatie
  algInfo: Info[] = [];
  dataInfo: { maanden: number[]; jaren: number[]; uren: number[]; dagen: number[]; plaatsen: number }[];
  aantalPersMin12: number;
  aantalPersPlus12: number;
  totaalPers: number;
  bedragMin12: number;
  bedragPlus12: number;
  totaalbedrag: number;
  datum: Date;
  time: number;

  //netwerkplugin
  networkStatus: any;
  networkListener: PluginListenerHandle;
  networkconnection: boolean;

  constructor(private dbServise: DatabaseService, private alertController: AlertController
    , public networkservice: NetworkService) {
    dbServise.retrieveInfoAsSnapshot('Info').then(i => this.algInfo = i);
    dbServise.retrieveDataInfoAsSnapshot('Data').then(i => this.dataInfo = i);
    this.networkconnection = true;
  }

  prijsberekenen() {
    this.setdata();
    if (this.aantalPersPlus12 != null && this.aantalPersMin12 != null) {
      this.totaalbedrag = (this.aantalPersPlus12 * this.bedragPlus12) + (this.aantalPersMin12 * this.bedragMin12);
    } else if (this.aantalPersMin12 != null && this.aantalPersPlus12 == null) {
      this.totaalbedrag = (this.aantalPersMin12 * this.bedragMin12);
    } else {
      this.totaalbedrag = (this.aantalPersPlus12 * this.bedragPlus12);
    }

  }

  async reservatieMaken() {
    let ok = await this.controleAantalPersonen(this.aantalPersMin12, this.aantalPersPlus12);
    ok += await this.controleInvoerDatum(this.datum);
    ok += await this.controleInvoerTijdstip(this.time);
    if (ok === '') {
      this.datum = new Date(this.datum);
      this.datum.setHours(this.time);
      this.datum.setMinutes(0);

      this.dbServise.sendInschrijvingSafari(this.totaalPers, this.datum.toDateString(), this.totaalbedrag);
      const alert = await this.alertController.create({
        header: 'Bevestiging reservatie',
        message: 'Uw reservatie is succesvol geregistreerd, wij verwachten u ' + this.datum.toLocaleDateString() + ' in Haven de Val',
        buttons: [
          {
            text: 'Oke',
            role: 'cancel',
            cssClass: 'secondary'
          }
        ]
      });
      await alert.present();
      this.totaalbedrag = 0;
      this.aantalPersPlus12 = null;
      this.aantalPersMin12 = null;
      this.datum = null;
    } else {
      const alert = await this.alertController.create({
        header: 'Fout bij reservatie',
        message: ok,
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
  }

  async controleInvoerDatum(datum: Date): Promise<string> {
    if (datum == null) {
      return 'Gelieve een datum in te vullen.</br>';
    }
    return '';
  }

  async controleInvoerTijdstip(time: number): Promise<string> {
    if (time == null) {
      return 'Gelieve een tijdstip te kiezen.</br>';
    }
    return '';
  }

  async controleAantalPersonen(aantalPersmin12: number, aantalPerplus12: number): Promise<string> {
    switch (true) {
      case aantalPerplus12 == null && aantalPersmin12 != null :
        return 'Kinderen onder de 12 jaar moeten begeleid worden door minstens één volwassenen.</br>';
        break;
      case aantalPersmin12 == null && aantalPerplus12 != null:
        if (aantalPerplus12 <= 6) {
          this.totaalPers = aantalPerplus12;
        } else {
          return 'Op de boot van de scheldesafari is maar plaats voor 6 personen</br>';
        }
        break;
      case aantalPersmin12 != null && aantalPerplus12 != null:
        this.totaalPers = aantalPerplus12 + aantalPersmin12;
        if (this.totaalPers > 6) {
          return 'Op de boot van de scheldesafari is maar plaats voor 6 personen</br>';
        } else {
          return '';
        }
        break;
      case aantalPersmin12 == null && aantalPerplus12 == null:
        return 'Gelieve het aantal personen in te vullen!</br>';
        break;
    }
  }

  async ngOnInit() {
    this.networkservice.network();
  }

  async setdata() {
    this.bedragMin12 = this.algInfo[0].prijs;
    this.bedragPlus12 = this.algInfo[1].prijs;
  }
}
