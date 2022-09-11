type AppConfig = {
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

type Title = string;
type Comment = string;
type Url = string;
type Timestamp = number;
type PlaceName = string;
type PlaceID = string;
type EventID = string;
