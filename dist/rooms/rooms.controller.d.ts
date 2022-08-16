import { createRoomDto } from 'src/dto';
import { RoomsService } from './rooms.service';
export declare class RoomsController {
    private RoomSevice;
    constructor(RoomSevice: RoomsService);
    getRooms(req: any): any;
    getRoom(params: any, req: any): Promise<import(".prisma/client").Room>;
    createRoom(body: createRoomDto): any;
    getRoomData(params: any, req: any): Promise<unknown>;
    getRoomDevices(params: any, req: any): Promise<import(".prisma/client").Room & {
        devices: {
            name: string;
        }[];
    }>;
}
