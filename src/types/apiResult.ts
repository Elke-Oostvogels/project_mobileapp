import {Activiteit} from './activiteit';

export interface ApiResult<D extends Date | string> {
  _id: string;
  datum: D;
  activiteiten: Activiteit<D>[];
}
