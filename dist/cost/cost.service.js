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
exports.CostService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const moment = require("moment");
require('twix');
let CostService = class CostService {
    constructor(DatabaseService) {
        this.DatabaseService = DatabaseService;
    }
    async getCostByDate(req) {
        {
            userIsRegistredOn: moment();
        }
        var cost = await this.DatabaseService.user.findFirst({
            where: {
                id: req.user.id,
            },
            select: {
                electricty_cost: true,
            },
        });
        var data = (await this.DatabaseService
            .$queryRaw `SELECT time_bucket('1 day', logged_at) AS BUCKET, SUM(power)/60 as avg_power FROM devicedata WHERE user_id=${req.user.id} GROUP BY bucket ORDER BY bucket ASC;`);
        var itr = moment(new Date('2022-01-01'))
            .twix(new Date('2022-12-31'))
            .iterate('days');
        var range = [];
        var j = 0;
        var dataSize = data.length;
        var monthArray = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const REFERENCE = moment(new Date());
        const TODAY = REFERENCE.clone().startOf('day');
        const isToday = (momentDate) => {
            return momentDate.isSame(TODAY, 'd');
        };
        var lastDateMonth = -1;
        while (itr.hasNext()) {
            var date1 = itr.next().format('YYYY-M-D');
            const d = new Date(date1);
            var todayornot = isToday(moment(date1));
            if (j >= dataSize) {
                if (d.getMonth() === lastDateMonth) {
                    range[d.getMonth()].days.push({
                        date: date1,
                        isCurrentMonth: true,
                        data: 0,
                        isToday: todayornot,
                    });
                }
                else {
                    range.push({
                        name: monthArray[d.getMonth()],
                        days: [
                            {
                                date: date1,
                                isCurrentMonth: true,
                                data: 0,
                                isToday: todayornot,
                            },
                        ],
                    });
                    lastDateMonth = d.getMonth();
                }
            }
            else {
                if (d.getMonth() === lastDateMonth) {
                    if (moment(date1).twix(data[j].bucket).isSame('day')) {
                        range[d.getMonth()].days.push({
                            date: date1,
                            isCurrentMonth: true,
                            data: cost.electricty_cost * data[j].avg_power,
                            isToday: todayornot,
                        });
                        j++;
                    }
                    else {
                        range[d.getMonth()].days.push({
                            date: date1,
                            isCurrentMonth: true,
                            data: 0,
                            isToday: todayornot,
                        });
                    }
                }
                else {
                    if (moment(date1).twix(data[j].bucket).isSame('day')) {
                        range.push({
                            name: monthArray[d.getMonth()],
                            days: [
                                {
                                    date: date1,
                                    isCurrentMonth: true,
                                    data: cost.electricty_cost * data[j].avg_power,
                                    isToday: todayornot,
                                },
                            ],
                        });
                        j++;
                    }
                    else {
                        range.push({
                            name: monthArray[d.getMonth()],
                            days: [
                                {
                                    date: date1,
                                    isCurrentMonth: true,
                                    data: 0,
                                    isToday: todayornot,
                                },
                            ],
                        });
                    }
                    lastDateMonth = d.getMonth();
                }
            }
        }
        return range;
    }
};
CostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CostService);
exports.CostService = CostService;
//# sourceMappingURL=cost.service.js.map