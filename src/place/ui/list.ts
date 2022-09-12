import { addPlace } from '../model/index.js';

export function buttonList(bot, logger, firebaseService, buttonText): void {
	bot.action(buttonText, async (ctx) => {
		logger.info('add place is pressed', ctx.update.message);

		const place = await addPlace(firebaseService);

		ctx.reply(`result: ${place.status}`);
	});
}
