import { DatabaseService } from 'src/database/database.service';
import { createRoomDto } from 'src/dto';
export declare class RoomsService {
    private DatabaseService;
    constructor(DatabaseService: DatabaseService);
    getRoom(req: any, id: number): Promise<import(".prisma/client").Room>;
    getRooms(req: any): Promise<import(".prisma/client").Room[]>;
    createRooms(body: createRoomDto): Promise<import(".prisma/client").Room>;
    getRoomData(req: any, id: number): Promise<unknown>;
    getRoomDevices(req: any, id: number): Promise<import(".prisma/client").Room & {
        devices: {
            name: string;
        }[];
    }>;
}
