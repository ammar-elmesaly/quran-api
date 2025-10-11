import request from "supertest"; 

import { app } from "../app";
import { deleteUserByUsername } from "../services/user";


describe('Register user', () => {
  it("should return 400 if username isn't valid", async () => {
    const res = await request(app).post('/users/new').send({
      username: "fo", // username is too short
      password: "ValidPassword123"
    });
    expect(res.status).toBe(400);
  });

  it("should return 400 if password isn't valid", async () => {
    const res = await request(app).post('/users/new').send({
      username: "john_doe",
      password: "invalid_password"  // password doesn't contain a number or an uppercase letter
    });
    expect(res.status).toBe(400);
  });

  it("should create the user", async () => {
    const res = await request(app).post('/users/new').send({
      username: "john_doe",
      password: "ValidPassword123"
    });
    expect(res.status).toBe(201);
  });

  afterAll(async () => {
    await deleteUserByUsername("john_doe");
  });
});

/*
describe('Login user', () => {
  it('should return 401 if not authenticated', async () => {
    const res = await request(app).get('/quran/saved');
    expect(res.status).toBe(401);
    expect(res.body).toEqual({"message":"Access Denied"});
  });

  it("should return 400 if user doesn't exist", async () => {
    const res = await request(app).post('/user/login');
    expect(res.status).toBe(401);
    expect(res.body).toEqual({"message":"Access Denied"});
  });
});
*/