import { Injectable, NotFoundException } from '@nestjs/common';
import { CatalogueUserRepository } from '../repository/catalogue.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalogue } from '../repository/entities/catalogue-user.entity';
import { CreateUserCatalogueDto } from '../dto/create-user-catalogue.dto';

@Injectable()
export class CatalogueService {
  constructor(
    @InjectRepository(CatalogueUserRepository)
    private catalogueUserRepository: CatalogueUserRepository,
  ) {
  }

  async getCatalogues(): Promise<Catalogue[]> {
    return await this.catalogueUserRepository.getCatalogues();
  }

  async createCatalogue(createCatalogueUserDto: CreateUserCatalogueDto): Promise<Catalogue> {
    return this.catalogueUserRepository.createCatalogue(createCatalogueUserDto);
  }
}
