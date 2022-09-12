import { initPlaceDatabase } from '../adapters/index.js';

export async function showPlaces(firebase) {
	const placeDatabase = initPlaceDatabase(firebase);

	const result = await placeDatabase.getPlaceList();

	return result;
}
