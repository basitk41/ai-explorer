import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * Data Transfer Object for login requests
 * Contains validation rules for email and password fields
 */
export class LoginDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
