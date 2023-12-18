import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/modules';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.getOrThrow("DB_HOST"),
                port: +configService.getOrThrow("DB_PORT"),
                database: configService.getOrThrow("DB_NAME"),
                username: configService.getOrThrow("DB_USERNAME"),
                password: configService.getOrThrow("DB_PASSWORD"),
                autoLoadEntities: configService.getOrThrow("DB_LOAD_ENTITIES"),
                synchronize: configService.getOrThrow("DB_SYNC"),
                // logging: true, //<- uncomment this for monitoring/show background sql
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            }),
            inject: [ConfigService],
            async dataSourceFactory(options) {
                if (!options) {
                  throw new Error('Invalid options passed');
                }
     
                return addTransactionalDataSource(new DataSource(options));
            },
        }),
    ]
})
export class DatabaseModule {}
