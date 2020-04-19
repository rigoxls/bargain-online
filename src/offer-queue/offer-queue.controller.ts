import { Controller, Post, Body } from '@nestjs/common';
import { OfferQueueService } from './offer-queue.service';

@Controller('offer-queue')
export class OfferQueueController {
  constructor(private offerQueueService: OfferQueueService) {
  }

  @Post()
  async SendOffer(@Body() offer: any) {
    this.offerQueueService.sendRequestEmit(offer, 1);
  }
}
