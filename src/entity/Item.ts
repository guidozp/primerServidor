import { json } from "stream/consumers"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Receipt } from "./Receipt"

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Column({nullable: false})
    price: number

    @OneToMany(() => Receipt, (receipt) => receipt.items)
    item: Item[]
}
