import { Timestamps } from "src/utils/base.timestamps.utils";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Exclude, classToPlain, instanceToPlain } from "class-transformer";

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