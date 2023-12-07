import { Exclude } from "class-transformer";
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export abstract class Timestamps {

    @CreateDateColumn({name: "created_at"})
    @Exclude()
    public created_at: Date;

    @UpdateDateColumn({name: "updated_at"})
    @Exclude()
    public updated_at: Date;

    @DeleteDateColumn({name: "deleted_at"})
    @Exclude()
    public deleted_at: Date;
    
}