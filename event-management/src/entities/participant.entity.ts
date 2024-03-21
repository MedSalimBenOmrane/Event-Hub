import { Entity, TableInheritance, OneToMany, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from "./ticket.entity";
import { info } from "./info.entity";

@Entity('user')
@TableInheritance({ column: { type: 'varchar', name: 'role' } })
export class Participant extends info {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Ticket, ticket => ticket.purchaser)
    tickets: Ticket[];
}
