import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../post/post.entity";
import { Exclude, instanceToPlain } from "class-transformer";
import { Timestamps } from "../../utils/base.timestamps.utils";
import { Roles } from "../role/roles.entity";

@Entity({name: "users"})
export class User extends Timestamps{

    @PrimaryGeneratedColumn("increment")
    public id: number;

    @Column()
    public username: string;

    @Column()
    @Exclude({toPlainOnly: true})
    public password: string;

    @Column({unique: true})
    public email: string;

    @OneToMany(() => Post, post => post.user)
    public posts: Post[];

    @Column()
    public role_id: number;

    @OneToOne(() => Roles, role => role.user)
    @JoinColumn()
    public role: Roles;

    toJSON(){
        return instanceToPlain(this)
    }
}
