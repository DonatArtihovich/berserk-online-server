import { Controller, Get } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators';
import { LoggerService } from 'src/logger/logger.service';

@Controller('users')
export class UsersController {
  private readonly logger = new LoggerService(UsersController.name);

  @Get('me')
  getMe(@GetUser() user: Express.User) {
    this.logger.log(`GET users/me ${user}`);
    return user;
  }
}
