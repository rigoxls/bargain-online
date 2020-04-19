import { Module } from '@nestjs/common';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferQueueModule } from './offer-queue/offer-queue.module';
import { CatalogueModule } from './catalogue/catalogue.module';
import { ProductModule } from './product/product.module';
import { OfferModule } from './offer/offer.module';
import { RequestModule } from './request/request.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, CatalogueModule, ProductModule, OfferModule, RequestModule, OfferQueueModule],
})
export class AppModule {}
