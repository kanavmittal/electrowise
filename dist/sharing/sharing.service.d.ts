import { DatabaseService } from 'src/database/database.service';
import { postFollowDto } from 'src/dto';
export declare class SharingService {
    private DatabaseService;
    constructor(DatabaseService: DatabaseService);
    searchUser(query: string): Promise<import(".prisma/client").User[]>;
    postFollow(request: postFollowDto): Promise<void>;
    getPendingRequests(req: any): Promise<any[]>;
    acceptRequests(req: any): Promise<import(".prisma/client").Followers>;
    seeFollowers(req: any): Promise<any[]>;
    deleteReq(req: any): Promise<import(".prisma/client").Followers>;
    Following(req: any): Promise<any[]>;
    shareData(req: any, id: number): Promise<unknown>;
}
