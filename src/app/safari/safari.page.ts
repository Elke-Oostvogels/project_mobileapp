import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../services/database.service';
import {Info} from '../../types/info';
import {
  DatePickerMode,
  DatePickerOptions,
  DatePickerPluginInterface,
  DatePickerTheme
} from '@capacitor-community/date-picker';
import {Plugins} from '@capacitor/core';

const datePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;
const { device } = Plugins;

@Component({
  selector: 'app-safari',
  templateUrl: './safari.page.html',
  styleUrls: ['./safari.page.scss'],
})
export class SafariPage implements OnInit {
  max: Date;
  min: Date;
  theme: DatePickerTheme;
  mode: DatePickerMode;
  locale: string;
  doneText: string;
  cancelText: string;
  timeMode = false;
  mergedDateAndTime = false;
  isIos = false;
  col='Info';
  algInfo: Info[] = [];
  constructor(private dbServise: DatabaseService) {
    dbServise.retrieveInfoAsSnapshot(this.col).then(i => this.algInfo = i);
    console.log(this.dbServise);
  }
  async ngOnInit() {
    const info = await device.getInfo();

    this.isIos = info.operatingSystem === 'ios';
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
