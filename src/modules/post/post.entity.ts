import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Exclude, instanceToPlain } from "class-transformer";
import { Timestamps } from "../../utils/base.timestamps.utils";

@Entity({name: 'posts'})
export class Post extends Timestamps{
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public title: string;

    @Column()
    public content: string;

    @Column()
    public user_id: number;

    @ManyToOne(() => User, user => user.posts)
    @Exclude({toPlainOnly: true})
    public user: User

    toJSON(){
        return instanceToPlain(this);
    }
}