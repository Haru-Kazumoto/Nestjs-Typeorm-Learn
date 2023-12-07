import { Exclude } from "class-transformer"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "users"})
export class User {

    @PrimaryGeneratedColumn("increment")
    public id: number;

    @Column()
    public username: string;

    @Column()
    @Exclude()
    public password: string;

    @Column({unique: true})
    public email: string;
 
}
