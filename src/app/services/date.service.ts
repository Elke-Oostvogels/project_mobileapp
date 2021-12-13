/*
import { Plugins } from '@capacitor/core';
import {
  DatePicker,
  DatePickerMode,
  DatePickerOptions,
  DatePickerPluginInterface,
  DatePickerTheme
} from '@capacitor-community/date-picker';
import {Injectable} from '@angular/core';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DateService{
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
  constructor() {}

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
      options.theme = 'light';
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
   return DatePicker.present(options);
  }
}
*/
