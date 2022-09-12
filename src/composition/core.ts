import { Container } from 'inversify';

export { injectable, inject } from 'inversify';

export const container = new Container();

export const TYPES = {
	AppConfig: Symbol.for('AppConfig'),
	App: Symbol.for('App'),
	Storage: Symbol.for('Storage'),
	Bot: Symbol.for('Bot'),
	Logger: Symbol.for('Logger'),
};
