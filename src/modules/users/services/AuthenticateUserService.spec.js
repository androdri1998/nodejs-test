const AppError = require('../../../shared/errors/AppError');
const AuthenticateUserService = require('./AuthenticateUserService');
const FakeUserRepository = require('../infra/mongoose/repositories/UserRepository/fakes/FakeUserRepository');
const FakeHashProvider = require('../providers/HashProvider/fakes/FakeHashProvider');

let fakeUserRepository;
let fakeHashProvider;
let authenticateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository({ connection: null });
    fakeHashProvider = new FakeHashProvider();
    authenticateUserService = new AuthenticateUserService({
      hashProvider: fakeHashProvider,
      userRepository: fakeUserRepository,
    });
  });

  it('it should be able to sign in on application', async () => {
    const user = {
      _id: 'c177529b-f7da-4ccb-a4bb-c7212620628a',
      username: 'john doe',
      password: '123456',
      profile: 'admin',
      created_at: Date.now(),
      updated_at: Date.now(),
      deleted_at: null,
    };

    await fakeUserRepository.saveUser({ user });

    const response = await authenticateUserService.execute({
      username: user.username,
      password: user.password,
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
    expect(response.user).toEqual(user);
  });

  it('it should not be able to sign in on application with non-existing user', async () => {
    await expect(
      authenticateUserService.execute({
        username: 'non-existing-user',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('it should not be able to sign in on application with wrong password', async () => {
    const user = {
      _id: 'c177529b-f7da-4ccb-a4bb-c7212620628a',
      username: 'john doe',
      password: '123456',
      profile: 'admin',
      created_at: Date.now(),
      updated_at: Date.now(),
      deleted_at: null,
    };

    await fakeUserRepository.saveUser({ user });

    await expect(
      authenticateUserService.execute({
        username: user.username,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
