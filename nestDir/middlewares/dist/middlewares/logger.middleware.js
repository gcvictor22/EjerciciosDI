"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
function loggerMiddleware(req, res, next) {
    console.log(`Endpoint called to: ${req.baseUrl}${req.url}, with method: ${req.method}, with body: ${JSON.stringify(req.body)}`);
    next();
}
exports.loggerMiddleware = loggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map