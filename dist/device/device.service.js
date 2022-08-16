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
exports.DeviceService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let DeviceService = class DeviceService {
    constructor(DatabaseService) {
        this.DatabaseService = DatabaseService;
    }
    async listDevices(req) {
        var data = await this.DatabaseService.device.findMany({
            where: {
                user_id: req.user.id,
            },
        });
        return data;
    }
    async oneDevice(req, id) {
        var data = await this.DatabaseService.device.findFirst({
            where: {
                id: id,
                user_id: req.user.id,
            },
        });
        return data;
    }
    async createDevice(body) {
        var data = await this.DatabaseService.device.create({
            data: {
                name: body.name,
                room_id: body.room_id,
                user_id: body.user_id,
            },
        });
        return data;
    }
    async deleteDevice(id) {
        const deleteData = this.DatabaseService.devicedata.deleteMany({
            where: {
                device_id: id,
            },
        });
        const deleteDevice = this.DatabaseService.device.delete({
            where: {
                id: id,
            },
        });
        var result = await this.DatabaseService.$transaction([
            deleteData,
            deleteDevice,
        ]);
        return result;
    }
    async deviceData(req, id) {
        var sharedData = await this.DatabaseService
            .$queryRaw `SELECT time_bucket('1 hour', logged_at) AS BUCKET, SUM(power)/60 as avg_power, SUM(current)/60 as avg_current, avg(voltage) as avg_voltage FROM devicedata WHERE user_id=${req.user.id} AND device_id=${id} GROUP BY bucket ORDER BY bucket ASC;`;
        return sharedData;
    }
    async getAllData(req) {
        var sharedData = await this.DatabaseService
            .$queryRaw `SELECT time_bucket('1 hour', logged_at) AS BUCKET, SUM(power)/60 as avg_power, SUM(current)/60 as avg_current, avg(voltage) as avg_voltage FROM devicedata WHERE user_id=${req.user.id} GROUP BY bucket ORDER BY bucket ASC;`;
        return sharedData;
    }
};
DeviceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DeviceService);
exports.DeviceService = DeviceService;
//# sourceMappingURL=device.service.js.map