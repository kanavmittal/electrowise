import { postFollowDto } from 'src/dto';
import { SharingService } from './sharing.service';
export declare class SharingController {
    private SharingService;
    constructor(SharingService: SharingService);
    getPendingRequests(req: any): any;
    sendReq(body: postFollowDto): any;
    delete(body: postFollowDto): any;
    accetReq(body: postFollowDto): any;
    followList(req: any): any;
    searchUser(query: any): any;
    following(req: any): any;
    getData(query: any, req: any): Promise<unknown>;
}
