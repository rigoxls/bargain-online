import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferRepository } from '../repository/offer.repository';
import { Offer } from '../repository/entities/offer.entity';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { OfferProductRepository } from '../repository/offer.product.repository';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(OfferRepository)
    private offerRepository: OfferRepository,
    @InjectRepository(OfferProductRepository)
    private offerProductRepository: OfferProductRepository,
  ) {
  }

  async getAllOffersByClient(userId: number): Promise<Offer> {
    const found = await this.offerRepository.getAllOffersByClient(userId);

    if (!found) {
      throw new NotFoundException(`Offers not found`);
    }

    return found;
  }

  async getAllOffersByProvider(userId: number): Promise<Offer> {
    const found = await this.offerRepository.getAllOffersByProvider(userId);

    if (!found) {
      throw new NotFoundException(`Offers not found`);
    }

    return found;
  }

  async getOfferById(id: number): Promise<Offer> {
    const found = await this.offerRepository.getOfferById(id);
    const offerProducts = await this.offerProductRepository.getOfferProductsByOfferId(found.Id);

    if (!found) {
      throw new NotFoundException(`Offer with ID ${id}, not found`);
    }

    return Object.assign(found, { products: offerProducts });
  }

  async updateOfferStatus(id: number): Promise<Offer> {
    return await this.offerRepository.updateOfferStatus(id);
  }

  async createOffer(createOfferDto: CreateOfferDto): Promise<Offer> {
    const offer = await this.offerRepository.createOffer(createOfferDto);

    if (createOfferDto) {
      createOfferDto.products.forEach(offerProduct => {
        this.offerProductRepository.createOfferProduct(offerProduct, offer.Id);
      });
    }

    return offer;
  }
}
