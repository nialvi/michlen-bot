import log4js, { Logger as ExternalLogger } from 'log4js';

type Logger = ExternalLogger;

const loggerModel = log4js.getLogger();
loggerModel.level = 'debug';

export { loggerModel, Logger };
