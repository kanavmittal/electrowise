import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class authLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class authRegisterDto {
  @IsString()
  @Length(4)
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(6, 32)
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone_number: string;
}
export class user {
  avg_power: number;
}
