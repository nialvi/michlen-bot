import { FirebaseStorageModel, Storage } from './model.js';
import { container, TYPES } from '../composition/index.js';

container.bind<Storage>(TYPES.Storage).to(FirebaseStorageModel);
