import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { createDeviceDto } from 'src/dto';
@Injectable()
export class DeviceService {
  constructor(private DatabaseService: DatabaseService) {}
  async listDevices(req: any) {
    var data = await this.DatabaseService.device.findMany({
      where: {
        user_id: req.user.id,
      },
    });
    return data;
  }
  async oneDevice(req: any, id: number) {
    var data = await this.DatabaseService.device.findFirst({
      where: {
        id: id,
        user_id: req.user.id,
      },
    });
    return data;
  }
  async createDevice(body: createDeviceDto) {
    var data = await this.DatabaseService.device.create({
      data: {
        name: body.name,
        room_id: body.room_id,
        user_id: body.user_id,
      },
    });
    return data;
  }
  async deleteDevice(id: number) {
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
  async deviceData(req: any, id: number) {
    var sharedData = await this.DatabaseService
      .$queryRaw`SELECT time_bucket('1 hour', logged_at) AS BUCKET, SUM(power)/60 as avg_power, SUM(current)/60 as avg_current, avg(voltage) as avg_voltage FROM devicedata WHERE user_id=${req.user.id} AND device_id=${id} GROUP BY bucket ORDER BY bucket ASC;`;
    // var data=await this.DatabaseService.device.findFirst({
    //     where:{
    //         id: id,
    //         user_id:req.user.id,
    //     },
    //     include:{
    //         Device_data:{
    //             where:{
    //                 logged_at:{
    //                     gte:new Date('2022-06-17 21:00:46.085')
    //                 }
    //             },
    //             select:{
    //                 logged_at:true,
    //                 power:true,
    //                 voltage:true,
    //                 current:true,
    //             }
    //         }
    //     }
    // })
    return sharedData;
  }
  async getAllData(req) {
    var sharedData = await this.DatabaseService
      .$queryRaw`SELECT time_bucket('1 hour', logged_at) AS BUCKET, SUM(power)/60 as avg_power, SUM(current)/60 as avg_current, avg(voltage) as avg_voltage FROM devicedata WHERE user_id=${req.user.id} GROUP BY bucket ORDER BY bucket ASC;`;
    return sharedData;
  }
}
