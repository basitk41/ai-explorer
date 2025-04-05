import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

/**
 * Main application module that configures the NestJS application
 * - Loads environment variables
 * - Sets up database connection with TypeORM
 * - Imports feature modules (Auth, Users)
 */
@Module({
  imports: [
    // Load environment variables with global access
    ConfigModule.forRoot({ isGlobal: true }),

    // Configure TypeORM with MongoDB
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('DATABASE_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        synchronize: true, // Set to false in production
        autoLoadEntities: true,
      }),
    }),

    // Feature modules
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
