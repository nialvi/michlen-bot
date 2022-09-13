import { injectable, inject, TYPES } from '../composition/index.js';

import { Bot } from '../bot/model.js';
import { Logger } from '../logger/index.js';
import { Place } from '../place/index.js';

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
		@inject(TYPES.Bot) private bot: Bot,
		@inject(TYPES.Place) private place: Place,
	) {}

	start() {
		this.logger.info('BOT IS STARTED 🚀');

		this.bot.start();

		this.initRouter();
	}

	stop(message: string): void {
		this.bot.stop(message);
	}

	initRouter(): void {
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

			const places = await this.place.showPlaces();

			if (places.length > 0) {
				ctx.reply(places.join('\n'));
			} else {
				ctx.reply('🫥 Список пуст');
			}
		});

		telegramBot.action(Buttons.ADD_PLACE, async (ctx) => {
			this.logger.info('button add place is pressed');

			const result = await this.place.addPlace();

			ctx.reply(result ? '✍️ Готово' : '🤔 Не получилося');

			// buttonList(bot, logger, firebaseService, Buttons.ADD_PLACE);
		});
	}
}
