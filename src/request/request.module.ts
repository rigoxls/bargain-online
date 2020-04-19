import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './services/request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestRepository } from './repository/request.repository';
import { RequestProductRepository } from './repository/request.product.repository';
import { ProductRepository } from '../product/respository/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestRepository, RequestProductRepository, ProductRepository]),
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
