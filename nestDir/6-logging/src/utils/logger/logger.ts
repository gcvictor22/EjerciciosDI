import { LoggerService, LogLevel } from "@nestjs/common";

export class Logger implements LoggerService {
    log(message: any, ...optionalParams: any[]) {
        console.log(
            `Este es un log tradicional ${new Date().getFullYear} | CONTENT: ${message} | EXTRAS: ${optionalParams}`
        );
        throw new Error("Method not implemented.");
    }
    error(message: any, ...optionalParams: any[]) {
        console.log(
            `Este es un error tradicional ${new Date().getFullYear} | CONTENT: ${message} | EXTRAS: ${optionalParams}`
        );
        throw new Error("Method not implemented.");
    }
    warn(message: any, ...optionalParams: any[]) {
        console.log(
            `Este es un warn tradicional ${new Date().getFullYear} | CONTENT: ${message} | EXTRAS: ${optionalParams}`
        );
        throw new Error("Method not implemented.");
    }
}
