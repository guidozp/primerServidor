import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    firstName: string

    @Column({nullable: false})
    lastName: string

    @Column({nullable: false})
    cpf: string

    @Column('json')
  address: {
    city: string;
    street: string;
    number: number;
    cep: string;
  };
}
