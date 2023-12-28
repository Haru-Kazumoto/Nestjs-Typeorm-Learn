import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { AccessPaths } from 'src/modules/access_roles/roles.access.entity';
import { Roles } from 'src/modules/role/roles.entity';
import { User } from 'src/modules/user/user.entity';
import { Repository } from 'typeorm';
import { TransactionalError } from 'typeorm-transactional';

@Injectable()
export class UserSeeder implements Seeder {

    constructor(
        @InjectRepository(Roles) private readonly rolesRepository: Repository<Roles>,
        @InjectRepository(AccessPaths) private readonly accessPathsRepository: Repository<AccessPaths>,
    ){}

    async seed(): Promise<any> {
        try{
            const rolesData = [
                {
                    name: 'ADMIN',
                    description: 'Admin of application'
                },
                {
                    name: 'USER',
                    description: 'User of application'
                },
                {
                    name: 'CREATOR',
                    description: 'Creator of posts'
                },
            ];
    
            const savedRoles = await Promise.all(
                rolesData.map(roleData => this.rolesRepository.save(this.rolesRepository.create(roleData)))
              );
    
            const access_paths = [
                {
                    path: "/admin/dashboard",
                    role: savedRoles.find(role => role.name === 'ADMIN')
                },
                {
                    path: "/admin/users",
                    role: savedRoles.find(role => role.name === 'ADMIN')
                },
                {
                    path: "/admin/users-posts",
                    role: savedRoles.find(role => role.name === 'ADMIN')
                },
                {
                    path: "/admin/statistics",
                    role: savedRoles.find(role => role.name === 'ADMIN')
                },
                {
                    path: "/user/dashboard",
                    role: savedRoles.find(role => role.name === 'USER')
                },
                {
                    path: "/user/posts",
                    role: savedRoles.find(role => role.name === 'USER')
                },
                {
                    path: "/user/become-creator",
                    role: savedRoles.find(role => role.name === 'USER')
                },
                {
                    path: "/user/creator/dashboard",
                    role: savedRoles.find(role => role.name === 'CREATOR')
                },
                {
                    path: "/user/creator/create-post",
                    role: savedRoles.find(role => role.name === 'CREATOR')
                },
                {
                    path: "/user/creator/statistics",
                    role: savedRoles.find(role => role.name === 'CREATOR')
                }
            ];
    
            for (const { path, role } of access_paths) {
                const foundRole = savedRoles.find(savedRole => savedRole.name === role.name);
                if (foundRole) {
                  const accessPath = this.accessPathsRepository.create({
                    path,
                    role: foundRole,
                  });
                  await this.accessPathsRepository.save(accessPath);
                  Logger.log(`Seeding access role success with data: ${path}`, "SEEDER");
                }
              }
            
            Logger.log(`Seeding role success with data : ${savedRoles}`, "SEEDER");

        } catch(err) {
            if(err instanceof TransactionalError){
                Logger.log("Seeding data failed.", "SEEDER");
                throw new TransactionalError("Error seeding data.");
            }
        }

    }

    async drop(): Promise<any> {
        await this.rolesRepository.delete({});
        await this.accessPathsRepository.delete({});

        Logger.log("Access paths and role has dropped.", "SEEDER");
    }

}
