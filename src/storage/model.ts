import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, set, ref, get, child } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { inject, injectable, TYPES } from '../composition/index.js';

import { Logger } from '../logger/index.js';
import { Config } from '../config/index.js';

export interface Storage {
	write(entity: string, data: any): Promise<{ status: 'OK' | 'ERROR' }>;
	getList<T>(id: string): Promise<T>;
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

	write(path: string, data: any): Promise<{ status: 'OK' | 'ERROR' }> {
		return new Promise((resolve, reject) => {
			set(ref(this.db, `${path}/${data.id}`), {
				...data,
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

	getList<T>(id: string) {
		return new Promise<T>((resolve, reject) => {
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
