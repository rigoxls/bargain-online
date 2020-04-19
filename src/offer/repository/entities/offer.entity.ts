import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusOffer } from '../../enums/status.enum';

@Entity()
export class Offer extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  User_Id: number;

  @Column()
  Id_Request: number;

  @Column()
  Status: StatusOffer;

  @Column('datetime', { default: () => 'GETDATE()' })
  Creation_Date: Date;
}
