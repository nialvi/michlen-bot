import { injectable, inject, TYPES } from '../composition/index.js';

import { Bot } from '../bot/model.js';
import { Logger } from '../logger/index.js';
// import { Storage } from '../storage/index.js';

export interface Application {
	start(): void;
	stop(message: string): void;
}

enum Buttons {
	DISHES_LIST = '📜 Список мест',
	ADD_PLACE = '📍 Добавить место',
}

@injectable()
export class AppModel implements Application {
	constructor(
		@inject(TYPES.Logger) private logger: Logger,
		// @inject(TYPES.Storage) private storage: Storage,
		@inject(TYPES.Bot) private bot: Bot,
	) {}

	start() {
		this.logger.info('BOT IS STARTED 🚀');

		this.bot.start();

		// this.bot.text(async (ctx) => {
		// 	this.logger.info('action text', ctx.update.message);

		// 	const result = await this.storage.writeMessage(
		// 		ctx.update.message.text,
		// 		ctx.update.message.date,
		// 	);

		// 	this.logger.info('status write message:', result.status);

		// 	ctx.reply('Hello world!');
		// });

		this.bot.text(async (ctx) => {
			this.logger.info('message is recieved', ctx.update.message.text);

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

		const telegramBot = this.bot.getInstance();

		telegramBot.action(Buttons.DISHES_LIST, async (ctx) => {
			this.logger.info('button dishes list is pressed');

			ctx.reply(Buttons.DISHES_LIST);
		});

		telegramBot.action(Buttons.ADD_PLACE, async (ctx) => {
			this.logger.info('button add place is pressed');

			ctx.reply(Buttons.ADD_PLACE);
		});

		// telegramBot.action(Buttons.DISHES_LIST, async (ctx) => {
		// 	this.logger.info('button dishes list is pressed');

		// 	const list = await showPlaces(firebaseService);

		// 	this.logger.info('list result ', list);

		// 	ctx.reply(list.result.join('\n'));
		// });

		// buttonList(bot, logger, firebaseService, Buttons.ADD_PLACE);
	}

	stop(message: string): void {
		this.bot.stop(message);
	}
}
