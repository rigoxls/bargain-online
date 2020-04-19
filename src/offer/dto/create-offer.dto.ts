import { IsArray, IsNotEmpty } from 'class-validator';
import { StatusOffer } from '../enums/status.enum';

export class CreateOfferDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  requestId: number;

  @IsNotEmpty()
  status: StatusOffer;

  @IsNotEmpty()
  @IsArray()
  products: Array<{
    productId: number,
    priceOffer: number,
  }>;
}
