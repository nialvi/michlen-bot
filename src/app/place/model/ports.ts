import { Place } from '../entity/index.js';

export interface DatabaseService {
  getPlaceList(): Promise<Response<string[]>>;
  // getPlaceById(id: PlaceID): Promise<Response<Place>>;
  writePlace(place: Place): Promise<Response<boolean>>;
}

type Response<T> = {
  result: T;
  status: 'success' | 'error';
  message?: string;
};
