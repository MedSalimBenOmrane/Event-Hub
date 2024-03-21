import { Time } from "@angular/common";
import { Admin } from "./admin.interface";
import { Creator } from "./creator.interface";
import { Image } from "./image.interface";
import { SellPoint } from "./sellPoint.interface";
import { Ticket } from "./ticket.interface";

export interface Event {
  id: number;
  name: string;
  type: string;
  lineUp: string;
  address: string;
  capacity: number;
  alcoholRules: boolean;
  ageRules: string;
  dressCode: string;
  ticketPrice: number;
  eventDate: string;
  sellPoint?: SellPoint;
  image: Image;
  creator: Creator;
  admin?: Admin;
  tickets: Ticket[];
  status: string;
}
