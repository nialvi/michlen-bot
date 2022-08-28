import { createPlace } from '../entity/index.js';
import { initPlaceDatabase } from '../adapters/index.js';

export async function addPlace(firebase) {
  const placeDatabase = initPlaceDatabase(firebase);

  const place = createPlace({
    id: 'test-1',
    type: 'restaurant',
    name: 'Test rest',
    time: new Date().getTime(),
  });

  const result = await placeDatabase.writePlace(place);

  return result;
}
