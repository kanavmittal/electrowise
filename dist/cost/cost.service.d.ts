import { DatabaseService } from 'src/database/database.service';
export declare class CostService {
    private DatabaseService;
    constructor(DatabaseService: DatabaseService);
    getCostByDate(req: any): Promise<any[]>;
}
