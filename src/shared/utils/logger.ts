import chalk from 'chalk';

type LogLevel = 'info' | 'success' | 'warn' | 'error' | 'debug';

const icons: Record<LogLevel, string> = {
  info: '\u2139\uFE0F',
  success: '\u2705',
  warn: '\u26A0\uFE0F',
  error: '\u274C',
  debug: '\ud83d\udd0d',
};

const stylize: Record<LogLevel, (msg: string) => string> = {
  info: chalk.blueBright,
  success: chalk.greenBright,
  warn: chalk.yellowBright,
  error: chalk.redBright,
  debug: chalk.gray,
};

function log(level: LogLevel, message: string, ...args: unknown[]): void {
  const timestamp = chalk.dim(new Date().toISOString());
  const icon = icons[level];
  const colorFn = stylize[level];
  const label = level.toUpperCase().padEnd(7);
  const formatted = colorFn(`${icon} [${label}] ${message}`);

  if (args.length > 0) {
    console.log(`${timestamp} ${formatted}`, ...args);
  } else {
    console.log(`${timestamp} ${formatted}`);
  }
}

export const logger = {
  info: (message: string, ...args: unknown[]) => log('info', message, ...args),
  success: (message: string, ...args: unknown[]) => log('success', message, ...args),
  warn: (message: string, ...args: unknown[]) => log('warn', message, ...args),
  error: (message: string, ...args: unknown[]) => log('error', message, ...args),
  debug: (message: string, ...args: unknown[]) => log('debug', message, ...args),
};
