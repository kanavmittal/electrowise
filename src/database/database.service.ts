import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient{
    constructor(){
        super({
            datasources:{
                db:{
                    url: "postgresql://root:km123456@localhost:5433/electrowise?schema=public"
                }
            }
        });
    }
}
