import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

/**
 * Authentication module that handles user registration, login and JWT validation
 * - Configures JWT using environment variables
 * - Sets up Passport for authentication
 * - Provides auth services and controllers
 */
@Module({
  imports: [
    // Import UsersModule to access user operations
    UsersModule,

    // Set up Passport for authentication strategies
    PassportModule,

    // Configure JWT asynchronously using environment variables
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' }, // Token expires in 1 day
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
