import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'aes_javeriana',
  password: 'javeriana',
  database: 'bargain-online',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
