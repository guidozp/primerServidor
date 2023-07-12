import { json } from "stream/consumers"
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User"
import { Item } from "./Item"

@Entity()
export class Receipt {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(() => Item, item => item.id)
    items: { itemId: number, quantity: number }[];

    @Column({nullable: false})
    total: number

}
