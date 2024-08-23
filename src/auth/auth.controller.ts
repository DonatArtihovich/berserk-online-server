import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthDto } from './dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token } = await this.authService.signin(dto);
    response.cookie('token', access_token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    });
    return {};
  }

  @Post('signup')
  async signup(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token } = await this.authService.signup(dto);
    response.cookie('token', access_token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    });
    return {};
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('token', '', { expires: new Date(Date.now()) });
    return {};
  }
}
