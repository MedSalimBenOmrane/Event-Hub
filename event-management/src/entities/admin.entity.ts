import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event.entity";
import { info } from "./info.entity";

@Entity('admin')
export class Admin extends info {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Event, event => event.admin)
    events: Event[]
}