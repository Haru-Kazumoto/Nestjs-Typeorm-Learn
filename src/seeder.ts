import { seeder } from "nestjs-seeder";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Roles } from "src/modules/role/roles.entity";
import { AccessPaths } from "src/modules/access_roles/roles.access.entity";
import { UserSeeder } from "./db/seeder/user.seeder";
import * as dotenv from "dotenv";
import { User } from "./modules/user/user.entity";
import { Post } from "./modules/post/post.entity";

dotenv.config();

seeder({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            autoLoadEntities: Boolean(process.env.DB_LOAD_ENTITIES),
            synchronize: Boolean(process.env.DB_SYNC),
            entities: [Roles, AccessPaths, User, Post]
        }),
        TypeOrmModule.forFeature([Roles, AccessPaths])
    ]
}).run([UserSeeder]);