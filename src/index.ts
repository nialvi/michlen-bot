import 'reflect-metadata';

import { container, TYPES } from './composition/index.js';

import { Application } from './app/index.js';
import { Logger } from './logger/index.js';

const logger = container.get<Logger>(TYPES.Logger);

const main = async (): Promise<void> => {
	try {
		const app = container.get<Application>(TYPES.App);

		app.start();

		process.once('SIGINT', () => app.stop('SIGINT'));
		process.once('SIGTERM', () => app.stop('SIGTERM'));
	} catch (error) {
		logger.error('Application not running:', error);
	}
};

main().catch((error) => logger.error('Application not running', error));
