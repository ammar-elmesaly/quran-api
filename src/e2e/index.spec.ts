import request from "supertest"; 

import { app } from "../app";

describe('Get / endpoint', () => {
  it('works!', async () => {
    const res = await request(app).get('/').expect(200);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      "name": "Quran-API",
      "version": "1.0.0",
      "description": "A RESTful API for accessing and exploring Quranic text programmatically.",
      "docs": "https://github.com/ammar-elmesaly/quran-api#readme",
      "endpoints": {
        "quran": "/quran/:surah/:verse",
        "tafsir": "/quran/:surah/:verse/tafsir/:tafsir",
        "user": "/users"
      }
    });
  });
});
