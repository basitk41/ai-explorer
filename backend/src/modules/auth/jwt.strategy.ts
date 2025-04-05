import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

/**
 * JWT Strategy for Passport
 * Validates JWT tokens and attaches user data to request object
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      // Extract JWT from Authorization header with Bearer scheme
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Reject expired tokens
      ignoreExpiration: false,
      // Verify token signature using secret from environment
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * Validate JWT payload and return user data
   * This method is called after token signature is verified
   * @param payload - Decoded JWT payload containing user identifiers
   * @returns User object without password
   */
  async validate(payload: any) {
    // Look up user by email from JWT payload
    const user = await this.usersService.findByEmail(payload.email);

    // Return user data without sensitive information
    const { password, ...result } = user;
    return result;
  }
}
