import { EntityRepository, Repository } from 'typeorm';
import { OfferProduct } from './entities/offer.product.entity';

@EntityRepository(OfferProduct)
export class OfferProductRepository extends Repository<OfferProduct> {

  async getOfferProductsByOfferId(offerId): Promise<OfferProduct[]> {
    const offer = await this.query(`
        SELECT pt.[Id]
              ,[Id_Offer]
              ,[Id_Product]
              ,[Price_Offer]
              ,[Name]
              ,[Description]
              ,[Price]
              ,[Id_Catalogue]
              ,[User_Id]
              ,[Image]

          FROM [bargain-online].[dbo].[offer_product] as oft
        JOIN [bargain-online].[dbo].[product] as pt on oft.Id_Product = pt.Id
        WHERE oft.Id_Offer = ${offerId}
    `);
    return offer;
  }

  async createOfferProduct(offerProductData, idOffer: number): Promise<OfferProduct> {
    const offerProduct = new OfferProduct();

    offerProduct.Id_Offer = idOffer;
    offerProduct.Id_Product = offerProductData.productId;
    offerProduct.Price_Offer = offerProductData.priceOffer;

    await offerProduct.save();
    return offerProduct;
  }
}
