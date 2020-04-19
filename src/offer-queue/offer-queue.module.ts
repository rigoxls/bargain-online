import { Module } from '@nestjs/common';
import { RabbitMQModule } from 'src/rabbit-mq/rabbit-mq.module';
import { OfferQueueService } from './offer-queue.service';
import { OfferQueueController } from './offer-queue.controller';

@Module({
  imports: [RabbitMQModule],
  controllers: [OfferQueueController],
  providers: [OfferQueueService],

})
export class OfferQueueModule {
}
