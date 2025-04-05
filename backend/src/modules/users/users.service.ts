import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as mockData from './mocks/data.json';

/**
 * Service handling user operations like finding, creating and validating users
 * Provides methods for user management used across the application
 */
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>
  ) {}

  /**
   * Find a user by email
   * @param email - The email to search for
   * @returns The user if found, undefined otherwise
   */
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    this.logger.debug(`Found user: ${user}`);
    return user;
  }

  /**
   * Create a new user account
   * @param email - User's email
   * @param name - User's name
   * @param password - User's password (will be hashed)
   * @returns User object without the password
   */
  async create(email: string, name: string, password: string) {
    // Check if user exists
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      this.logger.warn(`User already exists: ${existingUser}`);
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    // Return user without password
    const result = user.toJSON();
    return result;
  }

  /**
   * Validate a user's credentials
   * @param email - User's email
   * @param password - User's password (plaintext)
   * @returns User object without password if validation succeeds, null otherwise
   */
  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      this.logger.warn(`User not found: ${email}`);
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      this.logger.warn(`Invalid password for user: ${email}`);
      throw new UnauthorizedException('Invalid password');
    }

    return user.toJSON();
  }

  async getDashboardContent(user: any) {
    this.logger.debug('Generating dashboard content for user:', {
      email: user.email,
    });

    const data = {
      message: 'Welcome to your dashboard!',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      dashboardData: mockData,
    };

    this.logger.debug(
      'Dashboard content generated:',
      JSON.stringify(data, null, 2)
    );
    return data;
  }
}
