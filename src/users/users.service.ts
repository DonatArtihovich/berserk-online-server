import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async updateUser(id: number, dto: Partial<UserDto>) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { ...user, ...dto },
    });

    return updatedUser;
  }
}
