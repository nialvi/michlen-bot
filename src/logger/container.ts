import { container, TYPES } from '../composition/index.js';
import { loggerModel, Logger } from './model.js';

container.bind<Logger>(TYPES.Logger).toConstantValue(loggerModel);
