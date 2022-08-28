import { Event, Place } from './models.js';

type Api = {
  showAllPlaces(): Place[];
  showPlace(id: PlaceID): Place;

  addPlace(place: Place): Response;
  updatePlace(id: PlaceID, updatedPlace: Place): Response;
  deletePlace(id: PlaceID): Response;

  createEvent(event: Event): Response;
  showNearestEvent(): Event;
  showHistoryEvents(): Event[];
  showAllEvents(): Event[];
};

type Response = {
  message: 'success' | 'error';
  error?: string;
};
