export type PlaceType = 'restaurant' | 'hooka' | 'delivery';

export type Place = {
  id: PlaceID;
  type: PlaceType;
  name: PlaceName;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  site?: Url;
  location?: Url;
  comment?: Comment;
};

type PlaceParams = {
  id: PlaceID;
  time: Timestamp;
  type: PlaceType;
  name: PlaceName;
  site?: Url;
  location?: Url;
  comment?: Comment;
};

export function createPlace({
  id,
  type,
  name,
  time,
  site = '',
  location = '',
  comment = '',
}: PlaceParams): Place {
  return {
    id,
    type,
    name,
    createdAt: time,
    updatedAt: time,
    site,
    location,
    comment,
  };
}
