import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './respository/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
