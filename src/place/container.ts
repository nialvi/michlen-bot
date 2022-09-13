import { TYPES, container } from '../composition/index.js';
import { Place, PlaceModel } from './model.js';

container.bind<Place>(TYPES.Place).to(PlaceModel);
