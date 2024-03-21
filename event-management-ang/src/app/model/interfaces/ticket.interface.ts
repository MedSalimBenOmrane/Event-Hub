import { Event } from "./event.interface";
import { Participant } from "./participant.interface";

export interface Ticket {
  id: number;
  status: string;
  purchaser: Participant;
  event: Event;
}
