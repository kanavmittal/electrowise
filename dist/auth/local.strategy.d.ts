import { Strategy } from "passport-local";
import { DatabaseService } from "src/database/database.service";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private DatabaseService;
    constructor(DatabaseService: DatabaseService);
    validate(username: string, password: string): Promise<any>;
}
export {};
