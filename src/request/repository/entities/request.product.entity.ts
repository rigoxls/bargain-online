import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RequestProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Id_Request: number;

  @Column()
  Id_Product: number;

  @Column()
  Quantity: number;
}
