import request from "supertest"; 

import { app } from "../app";
import { deleteUserByUsername } from "../services/user";
import pool from "../services/db";


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
    await deleteUserByUsername("john_doe");  // Deleting the user after tests
  });
});

describe('Login user', () => {

  beforeAll(async () => {
    await request(app).post('/users/new').send({
      username: "john_doe",
      password: "ValidPassword123"
    });
  });

  let authCookie: string;

  it('should return 401 if not authenticated', async () => {
    const res = await request(app).get('/quran/saved');
    expect(res.status).toBe(401);
    expect(res.body).toEqual({"message":"Access Denied"});
  });

  it("should return 401 if user doesn't exist", async () => {
    const res = await request(app).post('/users/login').send({
      username: "doesnt_exist",
      password: "LoremIpsum123"
    });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({"message":'Invalid credentials'});
  });

  it("should login the user", async () => {
    const res = await request(app).post('/users/login').send({
      username: "john_doe",
      password: "ValidPassword123"
    });

    authCookie = res.headers['set-cookie']![0]!;

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: "Login successful",
      user: {
        id: expect.any(Number),
        username: "john_doe",
        created_at: expect.any(String)
      }
    });
    expect(authCookie).toBeTruthy();
  });

  it("should access protected routes", async () => {
    const res = await request(app)
    .get('/quran/saved')
    .set('Cookie', authCookie);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  afterAll(async () => {
    await deleteUserByUsername("john_doe");  // Deleting the user after tests
    pool.end();
  })
});