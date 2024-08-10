import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/isPublicDecorator';

type LoginType = {
  username: string;
  password: string;
};

type RegisterInfo = {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginInfo: LoginType) {
    return this.authService.login(loginInfo.username, loginInfo.password);
  }

  @Public()
  @Post('register')
  register(@Body() registerInfo: RegisterInfo) {
    return this.authService.register(
      registerInfo.username,
      registerInfo.firstname,
      registerInfo.lastname,
      registerInfo.password,
    );
  }

  @Public()
  @Post('cookie/login')
  // @ts-expect-error not-detected-type
  loginWithCookie(@Req() request) {
    const userId = request.user?.userId;

    return this.authService.cookieLogin(userId);
  }
}
