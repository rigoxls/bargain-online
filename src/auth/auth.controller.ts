import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) {
  }

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.authService.singUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{
    id: number,
    role: number,
    email: string,
    name: string,
  }> {
    return this.authService.singIn(authCredentialsDto);
  }
}
