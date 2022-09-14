import { injectable, inject, TYPES } from '../composition/index.js';
import { Logger } from '../logger/index.js';
import { Storage } from '../storage/index.js';

export type PlaceType = 'restaurant' | 'hooka' | 'delivery';

export type PlaceEntity = {
	id: PlaceID;
	type: PlaceType;
	name: PlaceName;
	createdAt: Timestamp;
	updatedAt: Timestamp;
	site?: Url;
	location?: Url;
	comment?: Comment;
};

export type PlaceParams = {
	type: PlaceType;
	name: PlaceName;
	site?: Url;
	location?: Url;
	comment?: Comment;
};

type PlaceDictionary = { [key: PlaceID]: PlaceEntity };

export interface Place {
	addPlace(): Promise<boolean>;
	getPlaceList(): Promise<PlaceDictionary>;
	showPlaces(): Promise<string[]>;
	getPlace(id: string): Promise<PlaceEntity>;
	createPlace(params: PlaceParams): PlaceEntity;
	seed(palces: PlaceEntity[]): boolean;
}

@injectable()
export class PlaceModel implements Place {
	constructor(
		@inject(TYPES.Storage) private storage: Storage,
		@inject(TYPES.Logger) private logger: Logger,
	) {}

	async addPlace() {
		try {
			const place = this.createPlace({ type: 'restaurant', name: 'Selfi' });

			const result = await this.storage.write('places', place);

			this.logger.info('add place result: ', result.status);

			return result.status === 'OK';
		} catch (error) {
			this.logger.error('add place error: ', error);

			return false;
		}
	}

	async getPlaceList() {
		try {
			const result = await this.storage.getList<PlaceDictionary>('places');

			this.logger.info('get places list: ', Object.keys(result).length);

			return result;
		} catch (error) {
			this.logger.error('get places list error: ', error);
			return {};
		}
	}

	async showPlaces() {
		const placeList = await this.getPlaceList();

		const result = Object.keys(placeList).map((key) => {
			const mapEmojiToType = {
				restaurant: '🍽',
				hooka: '💨',
				delivery: '📦',
			};

			return `${mapEmojiToType[placeList[key].type]} ${placeList[key].name}`;
		});

		this.logger.info('list of places: ', result);

		return result;
	}

	createPlace({
		type,
		name,
		site = '',
		location = '',
		comment = '',
	}: PlaceParams): PlaceEntity {
		return {
			id: `${name}-${new Date().getTime()}`,
			type,
			name,
			site,
			location,
			comment,
			createdAt: new Date().getTime(),
			updatedAt: new Date().getTime(),
		};
	}

	async getPlace(id: string) {
		try {
			const result = await this.storage.getPlace<PlaceEntity>(id);

			this.logger.info('show place list: ', result);

			return result;
		} catch (error) {
			this.logger.error('show place error: ', error);

			return null;
		}
	}

	seed(places): boolean {
		try {
			places.forEach(async (place) => {
				await this.storage.write('places', place);
			});

			return true;
		} catch (error) {
			this.logger.error('error in seed command: ', error);

			return false;
		}
	}
}
