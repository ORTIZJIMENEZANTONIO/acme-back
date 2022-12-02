import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  area: string;

  @Column()
  phone: string;
  
  @Column()
  zipCode: string;
}
