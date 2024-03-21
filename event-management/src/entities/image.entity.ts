import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event.entity";

@Entity('image')
export class Image {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varbinary',
        length: 'max',
        nullable: false,
    })
    data: Buffer;

    @OneToOne(() => Event, event => event.image)
    event: Event;
}