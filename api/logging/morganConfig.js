import morgan from "morgan";
import chalk from "chalk";

morgan.token('statusColor', (req, res) => {
    if (res.statusCode >= 500) {
        return chalk.red(res.statusCode);  // Red for server errors
    }
    if (res.statusCode >= 400) {
        return chalk.yellow(res.statusCode);  // Yellow for client errors
    }
    return chalk.green(res.statusCode);  // Green for successful requests
});

morgan.token('methodColor', (req) => {
    if (req.method === "POST") return chalk.cyan(req.method);
    if (req.method === "GET") return chalk.green(req.method);
    if (req.method === "PUT") return chalk.magenta(req.method);
    if (req.method === "DELETE") return chalk.red(req.method);
    return chalk.white(req.method);
});

// Define the custom log format string
const morganFormat = ':methodColor :url :statusColor - :response-time ms';

// Export the custom Morgan configuration
export const morganConfig = morgan(morganFormat);
