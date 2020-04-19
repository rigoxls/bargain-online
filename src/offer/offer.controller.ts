import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { OfferService } from './services/offer.service';
import { Offer } from './repository/entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';

@Controller('offer')
export class OfferController {
  constructor(private offerService: OfferService) {
  }

  @Get('getByClient/:userId')
  getAllOffersByClient(@Param('userId', ParseIntPipe) userId: number): Promise<Offer> {
    return this.offerService.getAllOffersByClient(userId);
  }

  @Get('getByProvider/:userId')
  getAllOffersByProvider(@Param('userId', ParseIntPipe) userId: number): Promise<Offer> {
    return this.offerService.getAllOffersByProvider(userId);
  }

  @Get('/:id')
  getOfferById(@Param('id', ParseIntPipe) id: number): Promise<Offer> {
    return this.offerService.getOfferById(id);
  }

  @Post('/updateStatus')
  updateOfferStatus(@Body() body): Promise<Offer> {
    return this.offerService.updateOfferStatus(body.id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createOffer(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offerService.createOffer(createOfferDto);
  }
}
