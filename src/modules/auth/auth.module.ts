import { Module, Session } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { LocalStrategy } from '../../security/local.strategy';
import { SessionSerializer } from '../../security/session.serializer';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { RoleRepository } from '../role/role.repository';

@Module(
    {
        imports: [
            TypeOrmModule.forFeature([User]),
            UserModule,
            RoleModule
        ],
        providers: [
            {
                provide: 'AUTH_SERVICE',
                useClass: AuthService
            },
            {
                provide: 'USER_SERVICE',
                useClass: UserService
            },
            {
                provide: 'USER_REPOSITORY',
                useClass: UserRepository
            },
            {
                provide: 'LOCAL_STRATEGY',
                useClass: LocalStrategy
            },
            {
                provide: 'SESSION_SERIALIZER',
                useClass: SessionSerializer
            },
            {
                provide: "ROLE_REPOSITORY",
                useClass: RoleRepository
            }
        ],
        controllers: [AuthController],
    }
)
export class AuthModule {}
