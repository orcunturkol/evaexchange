import { createLogger, transports, format } from "winston";
const { colorize, timestamp, align, printf, combine } = format;

export const logger = createLogger({
  transports: [new transports.Console()],
  level: "info",
  format: combine(
    colorize(),
    timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    align(),
    printf(
      (info) => `[${info.timestamp}] : [${info.level}] - [${info.message}]`
    )
  ),
});
