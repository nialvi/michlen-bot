import { injectable, inject, TYPES } from '../composition/index.js';

import { Bot } from '../bot/model.js';
import { Logger } from '../logger/index.js';
import { Place } from '../place/index.js';

import { places as mockPlaces } from '../seed.js';

export interface Application {
	start(): void;
	stop(message: string): void;
}

enum Buttons {
	PLASE_LIST = '📜 Список мест',
	WHERE_GO = '📍 Куда идем',
	ADD_PLACE = '📍 Добавить место',
	SEED = '/seedplaces',
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

		this.bot.launch();

		this.initRouter();
	}

	stop(message: string): void {
		this.bot.stop(message);
	}

	initRouter(): void {
		const telegramBot = this.bot.getInstance();

		telegramBot.command('start', async (ctx) => {
			this.logger.info('message is recieved', ctx.update.message.text);

			ctx.reply(
				[
					'⭐️ ⭐️ ⭐️ Michlen',
					'Тут ты можешь посмотреть список избранных мест куда можно сходить',
					'/help - покажет список команд',
				].join('\n\n'),
				{
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: Buttons.PLASE_LIST,
									callback_data: Buttons.PLASE_LIST,
								},
								{
									text: Buttons.WHERE_GO,
									callback_data: Buttons.WHERE_GO,
								},
							],
						],
					},
				},
			);
		});

		telegramBot.action(Buttons.PLASE_LIST, async (ctx) => {
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

		telegramBot.action(Buttons.WHERE_GO, (ctx) => {
			this.logger.info('button where to go is pressed');

			ctx.reply('🥩 Жажда крови');
		});

		telegramBot.hears(Buttons.SEED, async (ctx) => {
			this.logger.info('button seed is pressed');

			const result = await this.place.seed(mockPlaces);

			ctx.reply('seed result: ' + result);
		});

		telegramBot.help((ctx) => {
			ctx.replyWithHTML(
				[
					'<b>Справочная информация</b>',
					'/start - запустит бота',
					'/find - поиск места по названию',
					'/help - справка',
				].join('\n\n'),
			);
		});

		telegramBot.command('find', (ctx) => {
			this.logger.info('find command', ctx);
			ctx.reply('find command');
		});

		telegramBot.on('inline_query', async (ctx) => {
			this.logger.info('inline query', ctx.inlineQuery);

			const places = await this.place.showPlaces();

			await ctx.telegram.answerInlineQuery(
				ctx.inlineQuery.id,
				places.map((place) => ({
					type: 'article',
					title: place,
					id: place,
					input_message_content: {
						message_text: `${place} \n\n тут будет описание`,
					},
				})),
			);
		});
	}
}
