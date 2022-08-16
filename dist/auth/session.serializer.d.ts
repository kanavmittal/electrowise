import { PassportSerializer } from "@nestjs/passport";
export declare class SessionSerializer extends PassportSerializer {
    deserializeUser(payload: any, done: (err: Error, user: any) => void): any;
    serializeUser(user: any, done: (err: Error, user: any) => void): any;
}
