import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

/**
 * Data Transfer Object for user registration requests
 * Contains validation rules for email, name, and password fields
 */
export class RegisterDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/[a-zA-Z]/, { message: 'Password must contain at least 1 letter' })
  @Matches(/\d/, { message: 'Password must contain at least 1 number' })
  @Matches(/[^a-zA-Z\d]/, { message: 'Password must contain at least 1 special character' })
  password: string;
}
