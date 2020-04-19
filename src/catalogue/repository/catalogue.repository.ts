import { EntityRepository, Repository } from 'typeorm';
import { Catalogue } from './entities/catalogue-user.entity';
import { CreateUserCatalogueDto } from '../dto/create-user-catalogue.dto';

@EntityRepository(Catalogue)
export class CatalogueUserRepository extends Repository<Catalogue> {

  async getCatalogues(): Promise<Catalogue[]> {
    const catalogue = await this.find();
    return catalogue;
  }

  async createCatalogue(createUserCatalogueDto: CreateUserCatalogueDto): Promise<Catalogue> {
    const catalogueUser = new Catalogue();

    catalogueUser.Name = createUserCatalogueDto.name;
    catalogueUser.Description = createUserCatalogueDto.description;

    await catalogueUser.save();
    return catalogueUser;
  }
}
