import {Activiteit} from './activiteit';

export interface ApiResult {
  _id: string;
  datum: Date;
  activiteiten: Activiteit[];
}
