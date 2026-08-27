declare class Logger {
    private level;
    constructor();
    private formatMessage;
    debug(message: string, data?: any): void;
    info(message: string, data?: any): void;
    warn(message: string, data?: any): void;
    error(message: string, data?: any): void;
    private shouldLog;
}
export declare const logger: Logger;
export {};
//# sourceMappingURL=logger.d.ts.map