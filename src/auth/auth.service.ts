import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { authLoginDto, authRegisterDto } from 'src/dto';
@Injectable()
export class AuthService {
    constructor(private DatabaseService: DatabaseService){}
    async Register(dto:authRegisterDto){
        try {
            var data= await this.DatabaseService.user.create({
                data: {
                    username:dto.username,
                    password:dto.password,
                    email:dto.email,
                    electricty_cost:dto.cost,
                    phone_number:dto.phone_number,
                },
            })
            return data;
        } catch (error) {
            throw new HttpException("Error while registering", 500);
        }
    }
}
