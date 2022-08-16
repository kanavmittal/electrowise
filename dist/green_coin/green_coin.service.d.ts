import { DatabaseService } from 'src/database/database.service';
export declare class GreenCoinService {
    private DatabaseService;
    constructor(DatabaseService: DatabaseService);
    handleCron(): Promise<void>;
    getRandomInt(min: any, max: any): number;
}
