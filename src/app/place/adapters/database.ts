import { Place } from '../entity/index.js';
import { DatabaseService } from '../model/index.js';

import { DataBaseService } from '../../../database.js';

export function initPlaceDatabase(
  firebaseService: DataBaseService,
): DatabaseService {
  return {
    async writePlace(place: Place) {
      await firebaseService.writeMessage(place, place.createdAt);

      return {
        result: true,
        status: 'success',
      };
    },
    // getPlaceList(): Promise<Response<Place[]>>;
    // getPlaceById(id: PlaceID): Promise<Response<Place>>;
  };
}
