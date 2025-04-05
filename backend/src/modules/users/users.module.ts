import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';

/**
 * Users module that handles user-related functionality
 * - Registers the User entity with TypeORM
 * - Provides the UsersService for other modules
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Register User entity with TypeORM
  ],
  providers: [UsersService, JwtService], // Add JwtService to providers
  exports: [UsersService], // Export UsersService for use in AuthModule
  controllers: [UserController], // Add UserController to controllers
})
export class UsersModule {}
