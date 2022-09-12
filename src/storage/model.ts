import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, set, ref, get, child } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { inject, injectable, TYPES } from '../composition/index.js';

import { Logger } from '../logger/index.js';
import { Config } from '../config/index.js';

export interface Storage {
	writeMessage(mes: string, time: number): Promise<{ status: 'OK' | 'ERROR' }>;
	getList(id: string): Promise<any>;
}

@injectable()
export class FirebaseStorageModel implements Storage {
	app: FirebaseApp;
	db: Database;

	constructor(
		@inject(TYPES.AppConfig) private config: Config,
		@inject(TYPES.Logger) private logger: Logger,
	) {
		try {
			const { auth, ...firebaseConfig } = this.config.getData().firebase;

			this.app = initializeApp({ ...firebaseConfig });

			const authInstance = getAuth();

			signInWithEmailAndPassword(authInstance, auth.email, auth.password).catch(
				(error) => {
					const { code, message } = error;

					this.logger.info(`${code}: ${message}`);
				},
			);

			this.db = getDatabase(this.app);
		} catch (error) {
			this.logger.error('Error in a database initialization', error);
		}
	}

	writeMessage(mes: string, time: number): Promise<{ status: 'OK' | 'ERROR' }> {
		return new Promise((resolve, reject) => {
			set(ref(this.db, 'messages/' + String(time)), {
				mes,
			}).then(
				() => {
					resolve({ status: 'OK' });
				},
				() => {
					reject({ status: 'ERROR' });
				},
			);
		});
	}

	getList(id: string) {
		return new Promise((resolve, reject) => {
			get(child(ref(this.db), id)).then((snapshot) => {
				if (snapshot.exists()) {
					resolve(snapshot.val());
				} else {
					reject();
				}
			});
		});
	}
}
