import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Catalogue } from './repository/entities/catalogue-user.entity';
import { CreateUserCatalogueDto } from './dto/create-user-catalogue.dto';
import { CatalogueService } from './services/catalogue.service';

@Controller('catalogue')
export class CatalogueController {
  constructor(private catalogueUserService: CatalogueService) {
  }

  @Get()
  getCatalogues(): Promise<Catalogue[]> {
    return this.catalogueUserService.getCatalogues();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCatalogue(@Body() createCatalogueUserDto: CreateUserCatalogueDto): Promise<Catalogue> {
    return this.catalogueUserService.createCatalogue(createCatalogueUserDto);
  }
}
