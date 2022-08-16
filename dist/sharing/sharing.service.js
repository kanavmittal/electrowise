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
exports.SharingService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let SharingService = class SharingService {
    constructor(DatabaseService) {
        this.DatabaseService = DatabaseService;
    }
    async searchUser(query) {
        var data = await this.DatabaseService.user.findMany({
            where: {
                username: {
                    contains: query,
                    mode: 'insensitive',
                },
            },
        });
        return data;
    }
    async postFollow(request) {
        await this.DatabaseService.followers.create({
            data: {
                user_id: request.follow_id,
                follower_id: request.user_id,
                isPending: true,
            },
        });
    }
    async getPendingRequests(req) {
        var data = await this.DatabaseService.followers.findMany({
            where: {
                user_id: req.user.id,
                isPending: true,
            },
        });
        var result = [];
        for (var i = 0; i < data.length; i++) {
            var followData = await this.DatabaseService.user.findFirst({
                where: {
                    id: data[i].follower_id,
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                },
            });
            result.push({ follower_data: followData, request: data[i] });
        }
        return result;
    }
    async acceptRequests(req) {
        var dataOb = await this.DatabaseService.followers.findFirst({
            where: {
                user_id: req.user.id,
                follower_id: req.follow_id,
                isPending: true,
            },
        });
        console.log(dataOb);
        await this.DatabaseService.followers.update({
            where: {
                id: dataOb.id,
            },
            data: {
                isPending: false,
            },
        });
        return dataOb;
    }
    async seeFollowers(req) {
        var data = await this.DatabaseService.followers.findMany({
            where: {
                user_id: req.user.id,
                isPending: false,
            },
        });
        var result = [];
        for (var i = 0; i < data.length; i++) {
            var followData = await this.DatabaseService.user.findFirst({
                where: {
                    id: data[i].follower_id,
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                },
            });
            result.push(followData);
        }
        return result;
    }
    async deleteReq(req) {
        var dataOb = await this.DatabaseService.followers.findFirst({
            where: {
                user_id: req.user.id,
                follower_id: req.follow_id,
                isPending: true,
            },
        });
        await this.DatabaseService.followers.delete({
            where: {
                id: dataOb.id,
            },
        });
        return dataOb;
    }
    async Following(req) {
        var data = await this.DatabaseService.followers.findMany({
            where: {
                follower_id: req.user.id,
                isPending: false,
            },
        });
        var result = [];
        for (var i = 0; i < data.length; i++) {
            var followData = await this.DatabaseService.user.findFirst({
                where: {
                    id: data[i].user_id,
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                },
            });
            result.push(followData);
        }
        return result;
    }
    async shareData(req, id) {
        var data = await this.DatabaseService.followers.findFirst({
            where: {
                follower_id: req.user.id,
                user_id: id,
                isPending: false,
            },
        });
        if (data) {
            var sharedData = await this.DatabaseService
                .$queryRaw `SELECT time_bucket('1 hour', logged_at) AS BUCKET, SUM(power)/60 as avg_power, SUM(current)/60 as avg_current, avg(voltage) as avg_voltage FROM devicedata WHERE user_id=${data.user_id} GROUP BY bucket ORDER BY bucket ASC;`;
            return sharedData;
        }
        else {
            throw new common_1.NotFoundException();
        }
    }
};
SharingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SharingService);
exports.SharingService = SharingService;
//# sourceMappingURL=sharing.service.js.map