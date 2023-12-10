import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User as UserEntity } from "../user.entity";
import { UserService } from "../user.service";
import { UserRepository } from "../user.repository";

describe('UsersService',() => {
    let userService: UserService;
    let userRepository: UserRepository;

    const USER_REPOSITORY_TOKEN = getRepositoryToken(UserEntity);

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserRepository,
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        findOne: jest.fn()
                    }
                }
            ]
        }).compile();

        userService = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(USER_REPOSITORY_TOKEN);
    });

    it('userService should be defined', () => {
        expect(userService).toBeDefined();
    });

    it('userRepository should be defined', () => {
        expect(userRepository).toBeDefined();
    })
})