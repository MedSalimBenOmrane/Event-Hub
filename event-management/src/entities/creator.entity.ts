import { ChildEntity, OneToMany } from "typeorm";
import { Event } from "./event.entity";
import { Role } from "../enum/role.enum";
import { Participant } from "./participant.entity";

@ChildEntity(Role.CREATOR)
export class Creator extends Participant {

    @OneToMany(type => Event, event => event.creator)
    events: Event[];
}