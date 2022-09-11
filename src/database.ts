import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, set, ref, get, child } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export class DataBaseService {
	app: FirebaseApp;
	db: Database;

	constructor(config: AppConfig) {
		try {
			const { auth, ...firebaseConfig } = config.firebase;

			this.app = initializeApp({ ...firebaseConfig });

			const authInstance = getAuth();

			signInWithEmailAndPassword(authInstance, auth.email, auth.password).catch(
				(error) => {
					const { code, message } = error;

					console.log(`${code}: ${message}`);
				},
			);

			this.db = getDatabase(this.app);
		} catch (error) {
			console.error('Error in a database initialization', error);
		}
	}

	writeMessage(mes, time: number) {
		return new Promise((resolve, reject) => {
			set(ref(this.db, 'messages/' + String(time)), {
				mes,
			})
				.then(resolve, reject)
				.catch(reject);
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
