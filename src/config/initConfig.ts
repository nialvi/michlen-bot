export function getConfig(): Promise<AppConfig> {
	return new Promise<AppConfig>((resolve, reject) => {
		try {
			resolve({
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
			});
		} catch (e) {
			reject(e);
		}
	});
}
