import { Scenes, Telegraf } from 'telegraf';
import { getConfig } from './config/index.js';
import { DataBaseService } from './database.js';
import log4js from 'log4js';

const logger = log4js.getLogger();
logger.level = 'debug';

const main = async (config: AppConfig): Promise<void> => {
  const bot = new Telegraf<Scenes.SceneContext>(config.botToken);
  const db = new DataBaseService(config);

  bot.launch();
  logger.info('BOT IS STARTED 🚀');

  bot.on('text', (ctx) => {
    logger.info('action text', ctx.update.message);

    db.writeMessage(ctx.update.message.text, ctx.update.message.date);

    ctx.reply('Hello!');
  });

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

getConfig()
  .then((config) => {
    main(config);
  })
  .catch((error) => logger.error('Application not running', error));
