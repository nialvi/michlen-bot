import { inject, injectable, TYPES } from '../composition/index.js';
import { Logger } from '../logger/index.js';

export type ConfigData = {
	botToken: string;
	storagePath?: string;
	firebase: {
		auth?: {
			email: string;
			password: string;
		};
		apiKey: string;
		authDomain: string;
		databaseURL: string;
		projectId: string;
		storageBucket: string;
		messagingSenderId: string;
		appId: string;
		measurementId: string;
	};
};

export interface Config {
	getData(): ConfigData;
}

@injectable()
export class ConfigModel implements Config {
	config: ConfigData;

	constructor(@inject(TYPES.Logger) private logger: Logger) {
		try {
			this.config = {
				botToken: process.env.BOT_TOKEN,
				firebase: {
					auth: {
						email: process.env.FIREBASE_AUTH_EMAIL,
						password: process.env.FIREBASE_AUTH_PASSWORD,
					},
					apiKey: process.env.FIREBASE_API_KEY,
					authDomain: process.env.FIREBASE_AUTH_DOMAIN,
					databaseURL: process.env.FIREBASE_DATABASE_URL,
					projectId: process.env.FIREBASE_PROJECT_ID,
					storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
					messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
					appId: process.env.FIREBASE_APP_ID,
					measurementId: process.env.FIREBASE_MEASUREMENT_ID,
				},
			};
		} catch (error) {
			this.logger.info('Application config is not loaded:', error);
		}
	}

	getData(): ConfigData {
		return this.config;
	}
}
