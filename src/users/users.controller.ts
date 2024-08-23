import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guard';
import { LoggerService } from 'src/logger/logger.service';
import { UsersService } from './users.service';
import { UserDto } from './dto/users.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  private readonly logger = new LoggerService(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: Express.User) {
    this.logger.log(
      `GET users/me ${JSON.stringify(user)}`,
      UsersController.name,
    );

    return user;
  }

  @UseGuards(JwtGuard)
  @Patch('update-me')
  async updateMe(@GetUser() user: User, @Body() userDto: Partial<UserDto>) {
    const updatedUser = await this.usersService.updateUser(user.id, userDto);
    return updatedUser;
  }
}
