import { Column, PrimaryGeneratedColumn } from "typeorm";
import { BaseDate } from "./baseDate.entity";
import { Role } from "../enum/role.enum";

export class info extends BaseDate {

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    firstname: string;

    @Column({ type: 'bigint' })
    cin: number;

    @Column({ type: 'bigint' })
    phoneNumber: number;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar' })
    salt: string;

    @Column({ type: 'varchar' })
    role: Role
}