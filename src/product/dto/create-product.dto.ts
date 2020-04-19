import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  idCatalogue: number;

  @IsNotEmpty()
  image: string;
}
