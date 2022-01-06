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
    // Ensure that the alertController has loaded the required components to show the "no longer connected" message.
    // Without this line, the message won't be shown because the data hasn't been loaded and the browser is offline,
    // and can therefore no longer download the required chunk.
    // This shouldn't be required on Android/iOS as a local server is used there.
    this.alertController.create();
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
