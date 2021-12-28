import {Time} from '@angular/common';

export interface Activiteit<D> {
  naam: string;
  _id: string;
  icon: string;
  beginTijd: D;
  eindTijd: D;
  leeftijdscat: string;
  typeActiviteit: string;
  locatie: string;
  beschrijving: string;
  persLimiet: number;
  prijs: number;
}



