import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

/**
 * Controller handling authentication endpoints for registration and login
 * Exposes REST API endpoints for auth operations
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Handle user registration requests
   * @param registerDto - Data transfer object containing registration information
   * @returns Object containing user data and JWT token
   */
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Handle user login requests
   * @param loginDto - Data transfer object containing login credentials
   * @returns Object containing user data and JWT token
   * HTTP 200 OK status code is used for successful login
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
