import { Module, Session } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/local.strategy';
import { SessionSerializer } from './utils/session.serializer';
import { UserModule } from '../user/user.module';

@Module(
    {
        imports: [
            TypeOrmModule.forFeature([User]),
            PassportModule.register({
                session: true
            }),
            UserModule
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
            }
        ],
        controllers: [AuthController],
    }
)
export class AuthModule {}
