import { container, TYPES } from '../composition/index.js';
import { AppModel, Application } from './model.js';

container.bind<Application>(TYPES.App).to(AppModel);
