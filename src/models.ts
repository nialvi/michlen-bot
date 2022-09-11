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

export type PlaceType = 'restaurant' | 'hooka' | 'delivery';

export type Event = {
	id: EventID;
	placeId: PlaceID;
	startTime: Timestamp;
	endTime: Timestamp;
	title: Title;
	comment: Comment;
};
