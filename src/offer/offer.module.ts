import { Module } from '@nestjs/common';
import { OfferService } from './services/offer.service';
import { OfferController } from './offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferRepository } from './repository/offer.repository';
import { OfferProductRepository } from './repository/offer.product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([OfferRepository, OfferProductRepository]),
  ],
  providers: [OfferService],
  controllers: [OfferController],
})
export class OfferModule {}
