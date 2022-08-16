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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let RoomsService = class RoomsService {
    constructor(DatabaseService) {
        this.DatabaseService = DatabaseService;
    }
    async getRoom(req, id) {
        var data = await this.DatabaseService.room.findFirst({
            where: {
                id: id,
                user_id: req.user.id,
            }
        });
        return data;
    }
    async getRooms(req) {
        var data = await this.DatabaseService.room.findMany({
            where: {
                user_id: req.user.id,
            }
        });
        return data;
    }
    async createRooms(body) {
        console.log(body);
        try {
            var data = await this.DatabaseService.room.create({
                data: {
                    name: body.name,
                    user_id: body.user_id,
                    description: body.description
                }
            });
            return data;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException;
        }
    }
    async getRoomData(req, id) {
        var data = await this.DatabaseService.$queryRaw `SELECT time_bucket('1 hour', logged_at) AS BUCKET, SUM(power)/60 as avg_power, SUM(current)/60 as avg_current, avg(voltage) as avg_voltage FROM devicedata WHERE user_id=${req.user.id} AND room_id=${id} GROUP BY bucket ORDER BY bucket ASC;`;
        return data;
    }
    async getRoomDevices(req, id) {
        var data = await this.DatabaseService.room.findFirst({
            where: {
                id: id,
                user_id: req.user.id
            },
            include: {
                devices: {
                    select: {
                        name: true,
                    }
                }
            }
        });
        return data;
    }
};
RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], RoomsService);
exports.RoomsService = RoomsService;
//# sourceMappingURL=rooms.service.js.map