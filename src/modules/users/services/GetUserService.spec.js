const AppError = require('../../../shared/errors/AppError');
const GetUserService = require('./GetUserService');
const FakeUserRepository = require('../infra/mongoose/repositories/UserRepository/fakes/FakeUserRepository');

let fakeUserRepository;
let getUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository({ connection: null });
    getUserService = new GetUserService({
      userRepository: fakeUserRepository,
    });
  });

  it('it should be able to get user from application', async () => {
    const mockUser = {
      _id: 'c177529b-f7da-4ccb-a4bb-c7212620628a',
      username: 'john doe',
      password: '123456',
      profile: 'admin',
      created_at: Date.now(),
      updated_at: Date.now(),
      deleted_at: null,
    };

    await fakeUserRepository.saveUser({ user: mockUser });

    const { user: userResponse } = await getUserService.execute({
      // eslint-disable-next-line no-underscore-dangle
      userId: mockUser._id,
    });

    expect(userResponse).toHaveProperty('deleted_at');
    expect(userResponse).toHaveProperty('_id');
    expect(userResponse).toHaveProperty('username');
    expect(userResponse).toHaveProperty('profile');
    expect(userResponse).toHaveProperty('created_at');
    expect(userResponse).toHaveProperty('updated_at');
  });

  it('it should not be able to get user from application with non-existing user id', async () => {
    await expect(
      getUserService.execute({
        userId: 'non-existing-userId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
