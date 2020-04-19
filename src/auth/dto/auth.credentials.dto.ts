import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Roles } from '../enums/roles.enum';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  role: Roles;
  phone: string;
  address: string;

  // Client data
  lastName: string;
  name: string;

  // Provider data
  business_Name: string;
  nit: string;
  representative: string;
}
