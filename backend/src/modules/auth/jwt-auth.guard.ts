import {
  Injectable,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(context: ExecutionContext) {
    this.logger.debug('Attempting to activate JWT guard');
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err) {
      this.logger.error(`JWT validation error: ${err.message}`, err.stack);
      throw new UnauthorizedException('Invalid token');
    }

    if (!user) {
      this.logger.warn(
        `JWT validation failed: ${info?.message || 'No user found'}`
      );
      throw new UnauthorizedException('User not found');
    }

    this.logger.debug(`JWT validation successful for user: ${user.email}`);
    return user;
  }
}
