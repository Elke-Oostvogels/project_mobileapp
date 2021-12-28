import {Time} from '@angular/common';

export interface Activiteit {
  naam: string;
  _id: string;
  icon: string;
  beginTijd: Date;
  eindTijd: Date;
  leeftijdscat: string;
  typeActiviteit: string;
  locatie: string;
  beschrijving: string;
  persLimiet: number;
  prijs: number;
}



