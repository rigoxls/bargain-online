import { IsArray, IsNotEmpty } from 'class-validator';
import { StatusRequest } from '../enums/status-request.enum';

export class CreateRequestDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  status: StatusRequest;

  @IsNotEmpty()
  @IsArray()
  products: Array<{
    productId: number,
    quantity: number,
  }>;

}
