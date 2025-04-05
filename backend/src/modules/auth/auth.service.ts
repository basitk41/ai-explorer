import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

/**
 * Service handling authentication operations like registration and login
 * Manages JWT token generation and user validation
 */
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  /**
   * Register a new user and generate JWT token
   * @param registerDto - Data transfer object containing registration information
   * @returns Object containing user data and JWT token
   */
  async register(registerDto: RegisterDto) {
    // Create new user with data from DTO
    const user = await this.usersService.create(
      registerDto.email,
      registerDto.name,
      registerDto.password
    );

    // Generate JWT token with user ID and email
    const token = this.jwtService.sign({ sub: user.id, email: user.email });

    // Return user data and token
    return {
      user,
      token,
    };
  }

  /**
   * Authenticate user and generate JWT token
   * @param loginDto - Data transfer object containing login credentials
   * @returns Object containing user data and JWT token
   * @throws UnauthorizedException if credentials are invalid
   */
  async login(loginDto: LoginDto) {
    // Validate user credentials
    const user = await this.usersService.validateUser(
      loginDto.email,
      loginDto.password
    );

    // Throw exception if credentials are invalid
    if (!user) {
      this.logger.warn('Invalid credentials');
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token with user ID and email
    const token = this.jwtService.sign({ sub: user.id, email: user.email });

    // Return user data and token
    return {
      user,
      token,
    };
  }
}
