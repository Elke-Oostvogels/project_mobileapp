import {Component, OnInit} from '@angular/core';
import {DatabaseService} from '../services/database.service';
import {Info} from '../../types/info';
import {
  DatePickerMode,
  DatePickerOptions,
  DatePickerPluginInterface,
  DatePickerTheme
} from '@capacitor-community/date-picker';
import {Plugins} from '@capacitor/core';
import {SafariInfo} from '../../types/safariInfo';

const datePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;
const {device} = Plugins;

@Component({
  selector: 'app-safari',
  templateUrl: './safari.page.html',
  styleUrls: ['./safari.page.scss'],
})
export class SafariPage implements OnInit {
  // variable form reservatie
  isIos = false;
  isAndroid = false;
  isWeb = true;
  col = 'Info';
  algInfo: Info[] = [];
  dataInfo: { maanden: number[]; jaren: number[]; uren: number[]; dagen: number[] }[];
  aantalPersMin12: number;
  aantalPersPlus12: number;
  bedragMin12: number;
  bedragPlus12: number;
  totaalbedrag: number;
  datum: Date;
  time: Date;

  // variable plugin datepicker
  max: Date;
  min: Date;
  theme: DatePickerTheme;
  mode: DatePickerMode;
  locale: string;
  doneText: string;
  cancelText: string;
  timeMode = false;
  mergedDateAndTime = false;


  constructor(private dbServise: DatabaseService) {
    dbServise.retrieveInfoAsSnapshot('Info').then(i => this.algInfo = i);
    dbServise.retrieveDataInfoAsSnapshot('Data').then(i => this.dataInfo = i);
  }

  prijsberekenen() {
    this.setdata();
    console.log('- 12', this.aantalPersMin12, '+ 12', this.aantalPersPlus12);
    console.log('- 12', this.bedragMin12, '+ 12', this.bedragPlus12);
    if (this.aantalPersPlus12 != null && this.aantalPersMin12 != null) {
      this.totaalbedrag = (this.aantalPersPlus12 * this.bedragPlus12) + (this.aantalPersMin12 * this.bedragMin12);
    } else if (this.aantalPersMin12 != null && this.aantalPersPlus12 == null) {
      this.totaalbedrag = (this.aantalPersMin12 * this.bedragMin12);
    } else {
      this.totaalbedrag = (this.aantalPersPlus12 * this.bedragPlus12);
    }

  }

  reservatieMaken(){
    const aantalpers = this.aantalPersPlus12+ this.aantalPersPlus12;
    this.dbServise.sendInschrijvingSafari(aantalpers,this.datum,this.totaalbedrag);
  }
  async ngOnInit() {
  }

  async setdata() {
    this.bedragMin12 = this.algInfo[0].prijs;
    this.bedragPlus12 = this.algInfo[1].prijs;
  }

  async maxFocus() {
    document.body.focus();
    this.max = null;
    const pickerResult = await this.openPicker();
    if (pickerResult?.value) {
      this.max = new Date(pickerResult.value);
    }
  }

  async minFocus() {
    document.body.focus();
    this.min = null;
    const pickerResult = await this.openPicker();
    if (pickerResult?.value) {
      this.min = new Date(pickerResult.value);
    }
  }

  async openPicker() {
    const options: DatePickerOptions = {};
    if (this.max) {
      if (this.mode === 'date') {
        this.max.setHours(23, 59, 59, 999);
      }
      options.max = this.max.toISOString();
    }
    if (this.timeMode) {
      options.is24h = true;
    }
    if (this.min) {
      if (this.mode === 'date') {
        this.min.setHours(0, 0, 0, 0);
      }
      options.min = this.min.toISOString();
    }
    if (this.theme) {
      options.theme = 'dark';
    }
    if (this.mode) {
      options.mode = 'date';
    }
    if (this.locale) {
      options.locale = this.locale;
    }
    if (this.doneText) {
      options.doneText = this.doneText;
    }
    if (this.cancelText) {
      options.cancelText = this.cancelText;
    }
    if (this.mergedDateAndTime) {
      options.mergedDateAndTime = this.mergedDateAndTime;
    }
    console.log(datePicker.present(options));
    return datePicker.present(options);
  }

  async platformIs(platform: 'ios' | 'android' | 'electron' | 'web') {
    console.log(platform);
    return (await device.getInfo()).platform === platform;
  }
}
