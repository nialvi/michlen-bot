import { Scenes, Telegraf } from 'telegraf';
import { getConfig } from './config/index.js';
import { DataBaseService } from './database.js';
import log4js from 'log4js';

import { buttonList } from './app/place/ui/index.js';

const logger = log4js.getLogger();
logger.level = 'debug';

enum Buttons {
  DISHES_LIST = '📜 Список мест',
  ADD_PLACE = '📍 Добавить место',
}

const main = async (config: AppConfig): Promise<void> => {
  const bot = new Telegraf<Scenes.SceneContext>(config.botToken);
  const firebaseService = new DataBaseService(config);

  bot.launch();
  logger.info('BOT IS STARTED 🚀');

  bot.on('text', async (ctx) => {
    logger.info('message is recieved', ctx.update.message.text);

    ctx.reply('⭐️ ⭐️ ⭐️ Michlen', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: Buttons.DISHES_LIST,
              callback_data: Buttons.DISHES_LIST,
            },
            {
              text: Buttons.ADD_PLACE,
              callback_data: Buttons.ADD_PLACE,
            },
          ],
        ],
      },
    });
  });

  bot.action(Buttons.DISHES_LIST, (ctx) => {
    logger.info('button dishes list is pressed');
    ctx.reply('list of rest');
  });

  buttonList(bot, logger, firebaseService, Buttons.ADD_PLACE);

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

getConfig()
  .then((config) => {
    main(config);
  })
  .catch((error) => logger.error('Application not running', error));
