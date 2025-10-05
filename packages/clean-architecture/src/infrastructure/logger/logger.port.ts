/**
 * Interface for logging functionality, providing methods for different log levels.
 */
export interface LoggerPort {
  /**
   * Logs a message at the log level.
   * @param message - The message to log.
   * @param meta - Additional metadata to include in the log.
   */
  log(message: string, ...meta: unknown[]): void;

  /**
   * Logs a message at the error level.
   * @param message - The error message to log.
   * @param trace - Optional stack trace or additional error details.
   * @param meta - Additional metadata to include in the log.
   */
  error(message: string, trace?: unknown, ...meta: unknown[]): void;

  /**
   * Logs a message at the warn level.
   * @param message - The warning message to log.
   * @param meta - Additional metadata to include in the log.
   */
  warn(message: string, ...meta: unknown[]): void;

  /**
   * Logs a message at the debug level.
   * @param message - The debug message to log.
   * @param meta - Additional metadata to include in the log.
   */
  debug(message: string, ...meta: unknown[]): void;

  /**
   * Logs a message at the info level.
   * @param message - The info message to log.
   * @param meta - Additional metadata to include in the log.
   */
  info(message: string, ...meta: unknown[]): void;
}
