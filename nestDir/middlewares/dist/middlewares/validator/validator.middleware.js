"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorMiddleware = void 0;
const common_1 = require("@nestjs/common");
let ValidatorMiddleware = class ValidatorMiddleware {
    use(req, res, next) {
        const user = req.body;
        if (!user.nombre || !user.apellido) {
            const errorMessage = 'Invalid body request';
            console.log(`Error: ${errorMessage}`);
            return res.status(400).send(errorMessage);
        }
        next();
    }
};
ValidatorMiddleware = __decorate([
    (0, common_1.Injectable)()
], ValidatorMiddleware);
exports.ValidatorMiddleware = ValidatorMiddleware;
//# sourceMappingURL=validator.middleware.js.map