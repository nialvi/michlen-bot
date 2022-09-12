import { container, TYPES } from '../composition/index.js';

import { Config, ConfigModel } from './model.js';

container.bind<Config>(TYPES.AppConfig).to(ConfigModel);
