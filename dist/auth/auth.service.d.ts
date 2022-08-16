import { DatabaseService } from 'src/database/database.service';
import { authRegisterDto } from 'src/dto';
export declare class AuthService {
    private DatabaseService;
    constructor(DatabaseService: DatabaseService);
    Register(dto: authRegisterDto): Promise<import(".prisma/client").User>;
}
