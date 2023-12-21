import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './roles.entity';
import { AccessPaths } from '../access_roles/roles.access.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { RolesAccessModule } from '../access_roles/roles.access.module';
import { ResponseHttp } from 'src/utils/response.http.utils';
import { AccessRolesRepository } from '../access_roles/roles.access.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Roles, AccessPaths]),
        RolesAccessModule
    ],
    controllers: [RoleController],
    providers: [
        {
            provide: "ROLE_SERVICE",
            useClass: RoleService
        },
        {
            provide: "ROLE_REPOSITORY",
            useClass: RoleRepository
        },
        {
            provide: 'RESPONSE_HTTP',
            useClass: ResponseHttp
        },
        {
            provide: "ACCESS_REPOSITORY",
            useClass: AccessRolesRepository
        }
    ],
})
export class RoleModule {}
