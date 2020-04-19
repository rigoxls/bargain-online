import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './services/request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestRepository } from './repository/request.repository';
import { RequestProductRepository } from './repository/request.product.repository';
import { ProductRepository } from '../product/respository/product.repository';
import { OfferQueueService } from '../offer-queue/offer-queue.service';
import { RabbitMQModule } from '../rabbit-mq/rabbit-mq.module';

@Module({
  imports: [
    RabbitMQModule,
    TypeOrmModule.forFeature([RequestRepository, RequestProductRepository, ProductRepository]),
  ],
  controllers: [RequestController],
  providers: [RequestService, OfferQueueService],
})
export class RequestModule {}
