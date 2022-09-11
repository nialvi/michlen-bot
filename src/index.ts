import { Scenes, Telegraf } from 'telegraf';
import { getConfig } from './config/index.js';
import { DataBaseService } from './database.js';
import log4js from 'log4js';

import { buttonList } from './app/place/ui/index.js';
import { showPlaces } from './app/place/model/showPlaces.js';

const logger = log4js.getLogger();
logger.level = 'debug';

enum Buttons {
	DISHES_LIST = '📜 Список мест',
	ADD_PLACE = '📍 Добавить место',
}

const main = (
	config: AppConfig,
): {
	bot: Telegraf<Scenes.SceneContext<Scenes.SceneSessionData>>;
	firebaseService: DataBaseService;
} => {
	const bot = new Telegraf<Scenes.SceneContext>(config.botToken);
	const firebaseService = new DataBaseService(config);

	bot.launch();
	logger.info('BOT IS STARTED 🚀');

	process.once('SIGINT', () => bot.stop('SIGINT'));
	process.once('SIGTERM', () => bot.stop('SIGTERM'));

	return { bot, firebaseService };
};

const route = (
	bot: Telegraf<Scenes.SceneContext<Scenes.SceneSessionData>>,
	firebaseService: DataBaseService,
): void => {
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

	bot.action(Buttons.DISHES_LIST, async (ctx) => {
		logger.info('button dishes list is pressed');

		const list = await showPlaces(firebaseService);

		logger.info('list result ', list);

		ctx.reply(list.result.join('\n'));
	});

	buttonList(bot, logger, firebaseService, Buttons.ADD_PLACE);
};

getConfig()
	.then((config) => {
		const { bot, firebaseService } = main(config);

		route(bot, firebaseService);

		// const requestListener = function (req, res): void {
		//   route(bot, firebaseService);
		//   res.setHeader('Content-Type', 'application/json');
		//   res.writeHead(200);
		//   res.end(`{"message": "${req.url}"}`);
		// };

		// const server = http.createServer(requestListener);
		// const port = 3000;
		// const host = 'localhost';
		// server.listen(port, host, () => {
		//   console.log(`Server is running on http://${host}:${port}`);
		// });
	})
	.catch((error) => logger.error('Application not running', error));
