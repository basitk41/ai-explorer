import { Controller, Get, UseGuards, Request, Logger } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  async dashboard(@Request() req) {
    this.logger.debug(`Fetching dashboard for user: ${req.user}`);
    return this.usersService.getDashboardContent(req.user);
  }
}
