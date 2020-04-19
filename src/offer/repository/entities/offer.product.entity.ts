import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OfferProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Id_Offer: number;

  @Column()
  Id_Product: number;

  @Column()
  Price_Offer: number;
}
