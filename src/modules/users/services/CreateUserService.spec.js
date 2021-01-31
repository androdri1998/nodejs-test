const CreateUserService = require('./CreateUserService');
const FakeUserRepository = require('../infra/mongoose/repositories/UserRepository/fakes/FakeUserRepository');
const FakeHashProvider = require('../providers/HashProvider/fakes/FakeHashProvider');

let fakeUserRepository;
let fakeHashProvider;
let createUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository({ connection: null });
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService({
      hashProvider: fakeHashProvider,
      userRepository: fakeUserRepository,
    });
  });

  it('should be able to create user', async () => {
    const { user } = await createUserService.execute({
      username: 'john doe',
      password: '123456',
      profile: 'normal',
    });

    expect(user).toHaveProperty('deleted_at');
    expect(user).toHaveProperty('_id');
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('profile');
    expect(user).toHaveProperty('created_at');
    expect(user).toHaveProperty('updated_at');
  });
});
