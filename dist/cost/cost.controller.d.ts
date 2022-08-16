import { CostService } from './cost.service';
export declare class CostController {
    private CostService;
    constructor(CostService: CostService);
    getCostByDate(req: any): Promise<any[]>;
}
