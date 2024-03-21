import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SellPoint } from "./sellPoint.entity";
import { Image } from "./image.entity";
import { Creator } from "./creator.entity";
import { Admin } from "./admin.entity";
import { BaseDate } from "./baseDate.entity";
import { Ticket } from "./ticket.entity";
import { EventStatus } from "../enum/eventStatus.enum";

@Entity('event')
export class Event extends BaseDate {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    type: string;

    @Column({ type: 'varchar' })
    lineUp: string;

    @Column({ type: 'varchar' })
    address: string;

    @Column({ type: 'int' })
    capacity: number;

    @Column({ type: 'bit' })
    alcoholRules: boolean;

    @Column({ type: 'varchar' })
    ageRules: string;

    @Column({ type: 'varchar' })
    dressCode: string;

    @Column({ type: 'int' })
    ticketPrice: number;

    @Column({ type: 'datetime' })
    eventDate: string;

    @ManyToOne(() => SellPoint, sellPoint => sellPoint.events, {
        eager: true,
    })
    sellPoint: SellPoint;

    @OneToOne(() => Image, {
        cascade: true,
        eager: true
    })
    @JoinColumn()
    image: Image;

    @ManyToOne(() => Creator, creator => creator.events, {
        eager: true
    })
    creator: Creator;

    @ManyToOne(() => Admin, admin => admin.events, {
        eager: true
    })
    admin: Admin

    @OneToMany(() => Ticket, ticket => ticket.event)
    tickets: Ticket[];

    @Column({ type: 'varchar', default: EventStatus.PENDING })
    status: EventStatus;
}