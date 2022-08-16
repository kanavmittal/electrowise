import { AuthService } from './auth.service';
import { authRegisterDto } from 'src/dto';
export declare class AuthController {
    private AuthService;
    constructor(AuthService: AuthService);
    Login(req: any): any;
    Register(dto: authRegisterDto): Promise<import(".prisma/client").User>;
    getHello(req: any): any;
    logout(req: any): any;
}
