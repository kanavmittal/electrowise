import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class createDeviceDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    room_id: number

    @IsNotEmpty()
    @IsNumber()
    user_id: number
}

