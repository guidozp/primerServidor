import { json } from "stream/consumers"
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User"
import { Item } from "./Item"

@Entity()
export class Receipt {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User)
    @JoinColumn()
    userId: User

  @OneToMany(() => Item, item => item.id)
  items: { itemId: number, quantity: number }[];

    @Column({nullable: false})
    total: number

}
