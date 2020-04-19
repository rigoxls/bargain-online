import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Catalogue extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column(
    {
      length: 250,
    },
  )
  Name: string;

  @Column({
    length: 250,
  })
  Description: string;

  @Column('datetime', { default: () => 'GETDATE()' })
  Creation_Date: Date;
}
