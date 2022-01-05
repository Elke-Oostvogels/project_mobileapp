import {Injectable} from '@angular/core';
import {Network} from '@capacitor/network';
import {PluginListenerHandle} from '@capacitor/core';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  networkStatus: any;
  networkListener: PluginListenerHandle;
  networkconnection= true;


  constructor(private alertController: AlertController) {
  }

 async network(){
    this.networkListener = Network.addListener('networkStatusChange', (status) => {
      this.networkStatus = status;
      console.log('Network status changed', status);
      console.log(this.networkStatus.connected);
      if (this.networkStatus.connected === false) {
        this.networkconnection = false;
        this.message();
      } else {
        this.networkconnection = true;
      }
    });
  }

  async message() {
    const alert = await this.alertController.create({
      header: 'Network fout',
      message: 'U hebt momenteel geen netwerk verbinding,voor het optimaal gebruik van de app heeft u netwerk verbindig nodig',
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
