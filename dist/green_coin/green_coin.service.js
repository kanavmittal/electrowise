"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreenCoinService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const database_service_1 = require("../database/database.service");
let GreenCoinService = class GreenCoinService {
    constructor(DatabaseService) {
        this.DatabaseService = DatabaseService;
    }
    async handleCron() {
        var users = await this.DatabaseService.user.findMany({});
        var maxCoins = 100;
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            var data = (await this.DatabaseService
                .$queryRaw `SELECT time_bucket('1 day', logged_at) AS BUCKET, SUM(power)/60 as avg_power, SUM(current)/60 as avg_current, avg(voltage) as avg_voltage FROM devicedata WHERE user_id=${user.id} GROUP BY bucket ORDER BY bucket DESC LIMIT 2;`);
            if (data.length > 1) {
                if (data[0].avg_power > data[1].avg_power && user.green_coins > 0) {
                    const updateUser = await this.DatabaseService.user.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            green_coins: user.green_coins - (30 / 100) * 100,
                        },
                    });
                    console.log(updateUser);
                }
                else {
                    const updateUser = await this.DatabaseService.user.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            green_coins: user.green_coins +
                                Math.min(maxCoins, (data[0].avg_power / data[1].avg_power) * 100),
                        },
                    });
                    console.log(updateUser);
                }
            }
        }
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
};
__decorate([
    (0, schedule_1.Cron)('0 30 11 * * 1-6'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GreenCoinService.prototype, "handleCron", null);
GreenCoinService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], GreenCoinService);
exports.GreenCoinService = GreenCoinService;
//# sourceMappingURL=green_coin.service.js.map