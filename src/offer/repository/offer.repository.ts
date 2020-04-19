import { EntityRepository, Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { StatusOffer } from '../enums/status.enum';
import { StatusRequest } from '../../request/enums/status-request.enum';

@EntityRepository(Offer)
export class OfferRepository extends Repository<Offer> {

  async getAllOffersByClient(userId: number): Promise<Offer> {
    const offer = await this.query(`
      SELECT tof.Id
            ,tof.User_Id
            ,tof.Id_Request
            ,tof.Status
            ,tof.Creation_Date
            ,tus.email
            ,tus.representative
        FROM [bargain-online].[dbo].[offer] as tof
      JOIN [bargain-online].[dbo].[request_client] trc on trc.Id = tof.Id_Request
      JOIN [bargain-online].[dbo].[user] as tus on tus.Id = tof.User_Id
      WHERE trc.User_Id = ${userId}
    `);
    return offer;
  }

  async getAllOffersByProvider(userId: number): Promise<Offer> {
    const offer = await this.query(`
      SELECT tof.Id
            ,tof.User_Id
            ,tof.Id_Request
            ,tof.Status
            ,tof.Creation_Date
            ,tus.email
            ,tus.representative
        FROM [bargain-online].[dbo].[offer] as tof
      JOIN [bargain-online].[dbo].[user] as tus on tus.Id = tof.User_Id
      WHERE tof.User_Id = ${userId}
    `);
    return offer;
  }

  async getOfferById(id): Promise<Offer> {
    const offer = await this.findOne(id);
    return offer;
  }

  async updateOfferStatus(id): Promise<Offer> {
    const offer = await this.findOne(id);
    // updating all offers with rejected status/
    await this.query(`
        UPDATE [bargain-online].[dbo].[offer] SET Status = 'REJECTED' where Id_Request = ${offer.Id_Request}`);

    await this.query(`
        UPDATE [bargain-online].[dbo].[request_client] SET Status = '${StatusRequest.RESOLVED}' where Id = ${offer.Id_Request}`);

    offer.Status = StatusOffer.ACCEPTED;
    await offer.save();
    return offer;
  }

  async createOffer(createOfferDto: CreateOfferDto): Promise<Offer> {
    const offer = new Offer();

    offer.User_Id = createOfferDto.userId;
    offer.Id_Request = createOfferDto.requestId;
    offer.Status = createOfferDto.status;

    await offer.save();
    return offer;
  }
}
