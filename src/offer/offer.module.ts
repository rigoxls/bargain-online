import { Module } from '@nestjs/common';
import { OfferService } from './services/offer.service';
import { OfferController } from './offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferRepository } from './repository/offer.repository';
import { OfferProductRepository } from './repository/offer.product.repository';
import { UserRepository } from '../auth/user.repository';
import { OfferQueueService } from '../offer-queue/offer-queue.service';
import { RabbitMQService } from '../rabbit-mq/rabbit-mq.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OfferRepository, OfferProductRepository, UserRepository]),
  ],
  providers: [OfferService, OfferQueueService, RabbitMQService],
  controllers: [OfferController],
})
export class OfferModule {}
