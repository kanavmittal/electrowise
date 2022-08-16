import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as moment from 'moment';
require('twix');
@Injectable()
export class CostService {
  constructor(private DatabaseService: DatabaseService) {}
  async getCostByDate(req: any) {
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
      .$queryRaw`SELECT time_bucket('1 day', logged_at) AS BUCKET, SUM(power)/60 as avg_power FROM devicedata WHERE user_id=${req.user.id} GROUP BY bucket ORDER BY bucket ASC;`) as [
      { bucket: string; avg_power: number },
    ];

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
        } else {
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
      } else {
        if (d.getMonth() === lastDateMonth) {
          if (moment(date1).twix(data[j].bucket).isSame('day')) {
            range[d.getMonth()].days.push({
              date: date1,
              isCurrentMonth: true,
              data: cost.electricty_cost * data[j].avg_power,
              isToday: todayornot,
            });
            j++;
          } else {
            range[d.getMonth()].days.push({
              date: date1,
              isCurrentMonth: true,
              data: 0,
              isToday: todayornot,
            });
          }
        } else {
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
          } else {
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
}
