import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Roles } from './enums/roles.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async singUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { email, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const user = new User();
    user.Email = email;
    user.Salt = salt;
    user.Password = await this.hashPassword(password, salt);

    user.Id_Role = this.rolesConvention(authCredentialsDto.role);

    user.Lastname = authCredentialsDto.lastName;
    user.Name = authCredentialsDto.name;
    user.Phone = authCredentialsDto.phone;
    user.Address = authCredentialsDto.address;

    user.Business_Name = authCredentialsDto.business_Name;
    user.Nit = authCredentialsDto.nit;
    user.Representative = authCredentialsDto.representative;

    try {
      await user.save();
      return user;
    } catch (error) {
      if (error.number === 2627) { // duplicate uusername
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<{
    id: number,
    role: number,
    email: string,
    name: string,
  }> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ Email: email });
    const Role = await this.query(`select Role from Roles where Id = ${user.Id_Role}`);

    if (user && await user.validatePassword(password)) {
      return {
        id: user.Id,
        role: Role[0].Role,
        email: user.Email,
        name: `${user.Name} ${user.Lastname}`,
      };
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private rolesConvention(role): number {
    let roleId = 1;
    switch (role) {
      case Roles.CLIENT:
        roleId = 2;
        break;
      case Roles.PROVIDER:
        roleId = 3;
        break;
      case Roles.EXTERNAL_PROVIDER:
        roleId = 4;
        break;
    }

    return roleId;
  }
}
