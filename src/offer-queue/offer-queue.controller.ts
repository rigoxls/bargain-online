import { Controller, Post, Body } from '@nestjs/common';
import { OfferQueueService } from './offer-queue.service';

@Controller('offer-queue')
export class OfferQueueController {
    constructor(private offerQueueService: OfferQueueService) {
    }

    @Post()
    async SendOffer(@Body() offer: any) { // TODO: Controlar modelos y tipos de dato
      this.offerQueueService.sendOffer(offer);
    }
}
