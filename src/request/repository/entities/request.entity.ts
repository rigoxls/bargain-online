import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusRequest } from '../../enums/status-request.enum';

@Entity()
export class RequestClient extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  User_Id: number;

  @Column()
  Status: StatusRequest;

  @Column('datetime', { default: () => 'GETDATE()' })
  Creation_Date: Date;
}
