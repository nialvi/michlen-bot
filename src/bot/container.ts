import { container, TYPES } from '../composition/index.js';
import { TelegramBotModel } from './model.js';
import { Bot } from './model.js';

container.bind<Bot>(TYPES.Bot).to(TelegramBotModel);
