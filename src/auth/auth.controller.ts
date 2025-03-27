import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { CreateUserDto } from 'src/users/createUserDTO';
import { AuthGuard } from '@nestjs/passport';
import { AtGuard, RtGuard } from './common/guards';
import { GetCurrentUser } from './common/decorators/getCurrentUser.decorator';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  signup(@Body() signInDto: CreateUserDto) {
    return this.authService.signup(signInDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AtGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUser() user) {
    console.log('User in request:', user.sub);
    // const userId = req.user.sub;
    return this.authService.logoutLocal(user.sub);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@GetCurrentUser() user) {
    console.log('refresh', user);
    return this.authService.refreshLocal(user.sub, user.refreshToken);
  }
}
