import { DatabaseService } from 'src/database/database.service';
import { createDeviceDto } from 'src/dto';
export declare class DeviceService {
    private DatabaseService;
    constructor(DatabaseService: DatabaseService);
    listDevices(req: any): Promise<import(".prisma/client").Device[]>;
    oneDevice(req: any, id: number): Promise<import(".prisma/client").Device>;
    createDevice(body: createDeviceDto): Promise<import(".prisma/client").Device>;
    deleteDevice(id: number): Promise<[import(".prisma/client").Prisma.BatchPayload, import(".prisma/client").Device]>;
    deviceData(req: any, id: number): Promise<unknown>;
    getAllData(req: any): Promise<unknown>;
}
