import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {
  }

  async singUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.userRepository.singUp(authCredentialsDto);
  }

  async singIn(authCredentialsDto: AuthCredentialsDto): Promise<{
    id: number,
    role: number,
    email: string,
    name: string,
  }> {
    const user = await this.userRepository.validateUserPassword(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email: user.email };
    // const accessToken = await this.jwtService.sign(payload);

    return user;
  }
}
