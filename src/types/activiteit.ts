import {Time} from '@angular/common';

export interface Activiteit {
  naam: string;
  _id: string;
  icon: string;
  beginTijd: Time;
  eindTijd: Time;
  leeftijfscat: string;
  typeActiviteit: string;
  locatie: string;
  beschrijving: string;
  persLimiet: string;
  prijs: number;
}



