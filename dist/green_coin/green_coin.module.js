"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreenCoinModule = void 0;
const common_1 = require("@nestjs/common");
const green_coin_service_1 = require("./green_coin.service");
const green_coin_controller_1 = require("./green_coin.controller");
const database_module_1 = require("../database/database.module");
let GreenCoinModule = class GreenCoinModule {
};
GreenCoinModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        providers: [green_coin_service_1.GreenCoinService],
        controllers: [green_coin_controller_1.GreenCoinController],
    })
], GreenCoinModule);
exports.GreenCoinModule = GreenCoinModule;
//# sourceMappingURL=green_coin.module.js.map