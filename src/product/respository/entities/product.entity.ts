import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Name: string;

  @Column('text')
  Description: string;

  @Column()
  Price: number;

  @Column()
  Id_Catalogue: number;

  @Column()
  User_Id: number;

  @Column({
    length: 250,
  })
  Image: string;

  @Column('datetime', { default: () => 'GETDATE()' })
  Creation_Date: Date;
}
