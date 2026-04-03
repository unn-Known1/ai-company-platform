const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

const log = (level, ...args) => {
  if (levels[level] <= levels[LOG_LEVEL]) {
    console[level === 'error' ? 'error' : 'log'](`[${level.toUpperCase()}]`, new Date().toISOString(), ...args);
  }
};

export default {
  error: (...args) => log('error', ...args),
  warn: (...args) => log('warn', ...args),
  info: (...args) => log('info', ...args),
  debug: (...args) => log('debug', ...args)
};
