import { Module } from '@nestjs/common';
import { CatalogueService } from './services/catalogue.service';
import { CatalogueController } from './catalogue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogueUserRepository } from './repository/catalogue.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatalogueUserRepository]),
  ],
  providers: [CatalogueService],
  controllers: [CatalogueController],
})
export class CatalogueModule {}
