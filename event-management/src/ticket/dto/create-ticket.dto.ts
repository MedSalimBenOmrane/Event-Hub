import { IsNotEmpty, IsString } from "class-validator";
import { TicketStatus } from "../../enum/ticketStatus.enum";
import { Event } from "../../entities/event.entity";
import { Participant } from "../../entities/participant.entity";

export class CreateTicketDto {
    @IsNotEmpty()
    @IsString()
    status: TicketStatus

    @IsNotEmpty()
    purchaser: Participant

    @IsNotEmpty()
    event: Event
}
