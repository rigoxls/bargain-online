import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['Email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({
    length: 250,
  })
  Email: string;

  @Column({
    length: 250,
    nullable: true,
  })
  Lastname: string;

  @Column({
    length: 250,
    nullable: true,
  })
  Name: string;

  @Column({
    length: 250,
  })
  Phone: string;

  @Column({
    length: 250,
  })
  Address: string;

  @Column({
    length: 250,
    nullable: true,
  })
  Business_Name: string;

  @Column({
    length: 30,
    nullable: true,
  })
  Nit: string;

  @Column({
    length: 250,
    nullable: true,
  })
  Representative: string;

  @Column({
    length: 250,
  })
  Password: string;

  @Column({
    length: 250,
  })
  Salt: string;

  @Column()
  Id_Role: number;

  @Column('datetime', { default: () => 'GETDATE()' })
  Creation_Date: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.Salt);
    return hash === this.Password;
  }
}
