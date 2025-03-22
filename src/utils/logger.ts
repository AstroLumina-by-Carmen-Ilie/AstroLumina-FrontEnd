export class Logger {
    private static instance: Logger;
    private logs: string[] = [];
    private maxLogs: number = 1000;

    private constructor() {}

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    log(message: string, data?: any) {
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp}: ${message} ${data ? JSON.stringify(data) : ''}`;
        console.log(logMessage);
        this.logs.push(logMessage);
        
        // Keep only the last maxLogs entries
        if (this.logs.length > this.maxLogs) {
            this.logs = this.logs.slice(-this.maxLogs);
        }
    }

    error(message: string, error?: any) {
        const timestamp = new Date().toISOString();
        const errorMessage = `${timestamp} ERROR: ${message} ${error ? JSON.stringify(error) : ''}`;
        console.error(errorMessage);
        this.logs.push(errorMessage);
        
        if (this.logs.length > this.maxLogs) {
            this.logs = this.logs.slice(-this.maxLogs);
        }
    }

    getLogs(): string[] {
        return [...this.logs];
    }

    clearLogs() {
        this.logs = [];
    }

    // Method to display logs on screen (useful for mobile debugging)
    showLogsOnScreen() {
        let logsContainer = document.getElementById('debug-logs-container');
        
        if (!logsContainer) {
            logsContainer = document.createElement('div');
            logsContainer.id = 'debug-logs-container';
            logsContainer.style.cssText = `
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                max-height: 200px;
                overflow-y: auto;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                font-family: monospace;
                font-size: 12px;
                padding: 10px;
                z-index: 9999;
            `;
            document.body.appendChild(logsContainer);
        }

        logsContainer.innerHTML = this.logs.join('<br>');
        logsContainer.scrollTop = logsContainer.scrollHeight;
    }
}

export const logger = Logger.getInstance();
