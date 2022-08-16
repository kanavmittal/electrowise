import { createDeviceDto } from 'src/dto';
import { DeviceService } from './device.service';
export declare class DeviceController {
    private DeviceService;
    constructor(DeviceService: DeviceService);
    getDevices(req: any): Promise<import(".prisma/client").Device[]>;
    getOne(req: any, params: any): Promise<import(".prisma/client").Device>;
    createDevice(body: createDeviceDto): Promise<import(".prisma/client").Device>;
    getDeviceData(req: any, params: any): Promise<unknown>;
    deleteData(params: any): Promise<[import(".prisma/client").Prisma.BatchPayload, import(".prisma/client").Device]>;
    getAllData(req: any): Promise<unknown>;
}
