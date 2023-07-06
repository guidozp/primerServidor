import { json } from "stream/consumers"
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User"
import { Item } from "./Item"



@Entity()
export class Receipt {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User)
    @JoinColumn()
    userId: User


    @ManyToOne(() =>Item, (item) => item.receipt)
    items: Item[]


    @Column({nullable: false})
    total: number

}
