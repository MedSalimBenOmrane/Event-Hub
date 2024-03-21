import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseDate } from "./baseDate.entity";
import { TicketStatus } from "../enum/ticketStatus.enum";
import { Event } from "./event.entity";
import { Participant } from "./participant.entity";

@Entity('ticket')
export class Ticket extends BaseDate {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    status: TicketStatus;

    @ManyToOne(() => Participant, purchaser => purchaser.tickets, {
        eager: true
    })
    purchaser: Participant;

    @ManyToOne(() => Event, event => event.tickets, {
        eager: true
    })
    event: Event;
}