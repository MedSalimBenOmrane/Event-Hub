import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event.entity";

@Entity('sellpoint')
export class SellPoint {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    address: string;

    @Column({ type: 'bigint' })
    phoneNumber: number;

    @OneToMany(() => Event, event => event.sellPoint)
    events: Event[];
}