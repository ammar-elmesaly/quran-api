import { loginUser, registerUser } from "../handlers/user";
import { mockReq, mockRes, mockNext } from "../__mocks__/user";
import * as userService from '../services/user';

jest.mock('../services/user');

const mockedUserService = userService as jest.Mocked<typeof userService>;

describe('Login user', () => {

  afterEach(() => {
    mockedUserService.findUser.mockReset();
  });

  it('logs user in', async () => {

    mockedUserService.findUser.mockResolvedValue({
      id: 1,
      username: "bob",
      password_hash: "$2a$12$jMoV809/PiehvznGyU3NeuoiFJDhX1z7dZnrNVKh85Xl4Ak/GpmrK",  // pass123 hashed
    });

    await loginUser(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      message: "Login successful",
      user: expect.objectContaining({
        id: 1,
        username: "bob",
      })
    }));
    expect(mockRes.cookie).toHaveBeenCalledWith("token", undefined, {  // token here is undefined because it's mocked
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    });
  });

  it("returns 401 if the user doesn't exist", async () => {
    await loginUser(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  it("returns 401 if the password is incorrect", async () => {
    mockedUserService.findUser.mockResolvedValue({
      id: 1,
      username: "bob",
      password_hash: "$2a$12$jMoV809/PiehvznGyU3NeuoiFJDhX1z7dZnrNVKh85Xl4Ak/GpmrK",  // pass123 hashed
    });

    mockReq.body.password = "wrong_password";

    await loginUser(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

});

describe('Register user', () => {
  it('registers the user', async () => {
    await registerUser(mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'User registered successfully!' })
  });
});