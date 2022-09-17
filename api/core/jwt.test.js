import timekeeper from 'timekeeper'
import { createToken, getPrivateKey, verifyToken } from "./jwt";

jest.mock('./db')

const now = 1604416038
// const monthAgo = sub(fromUnixTime(now), {months:1}).getTime()

describe("jwt", () => {
  beforeAll(() => {
    timekeeper.freeze(now *1000)
  })
  afterAll(() => {
    timekeeper.reset
  })
  it("should create JWT", async () => {
    const token = await createToken({
      id: 1,
      email: 'toto@toto.com'
    })
    expect(token).toBe('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRvdG9AdG90by5jb20ifSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwic3ViIjoxLCJpYXQiOjE2MDQ0MTYwMzgsImV4cCI6MTYwNTI4MDAzOH0.lvwu0hXBJDTY_IIsv_Fh-mqgU7fRO0c63LFtAhQbeZtO2rQnhOiVYyiR5B2_lWs3eWfzpRbv8unQ_MDyBTC_xWwwPZXLgn0e8ySMCi8So5evv8exiDfxiu1i8r37HQSTurOG6EylKw9G6Owj1O_anAgBraFXWbxfHP2zsAQOH68JVyZYDu__DFtjM860pwB96Qdzb8iJOqSU4JOYu5KNE3PsXYPyhwbJY10NDe2UrsL5I4c9BRzPwgGkD_L8ID4NUK0JmE_fWjR1RocOvHdb5cWfwTuMKLvNuMwCgeZb7rn2YJ_lROAmXAGY5ujPoiJTFZOhY-YcfAhLpyHEHRKdgg')
  });
  it("should decode jwt", async () => {
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRvdG9AdG90by5jb20ifSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwic3ViIjoxLCJpYXQiOjE2MDQ0MTYwMzgsImV4cCI6MTYwNTI4MDAzOH0.lvwu0hXBJDTY_IIsv_Fh-mqgU7fRO0c63LFtAhQbeZtO2rQnhOiVYyiR5B2_lWs3eWfzpRbv8unQ_MDyBTC_xWwwPZXLgn0e8ySMCi8So5evv8exiDfxiu1i8r37HQSTurOG6EylKw9G6Owj1O_anAgBraFXWbxfHP2zsAQOH68JVyZYDu__DFtjM860pwB96Qdzb8iJOqSU4JOYu5KNE3PsXYPyhwbJY10NDe2UrsL5I4c9BRzPwgGkD_L8ID4NUK0JmE_fWjR1RocOvHdb5cWfwTuMKLvNuMwCgeZb7rn2YJ_lROAmXAGY5ujPoiJTFZOhY-YcfAhLpyHEHRKdgg"
    const payload = await (verifyToken(token))

    expect(payload).toEqual({
      "aud": "http://localhost:3000",
      "exp": 1605280038,
      "iat": 1604416038,
      "iss": "http://localhost:3000",
      "sub": 1,
      "user": {
        "email": "toto@toto.com",
        "id": 1,
      },
    })
  });
  it("should reject bad JWT", async () => {
    expect.assertions(1);
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRvdG9AdG90by5jb20ifSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwic3ViIjoxLCJpYXQiOjE2MDQ0MTYwMzgsImV4cCI6MTYwNTI4MDAzOH0.lvwu0hXBJDTY_IIsv_Fh-mqgU7fRO0c63LFtAhQbeZtO2rQnhOiVYyiR5B2_lWs3eWfzpRbv8unQ_MDyBTC_xWwwPZXLgn0e8ySMCi8So5evv8exiDfxiu1i8r37HQSTurOG6EylKw9G6Owj1O_anAgBraFXWbxfHP2zsAQOH68JVyZYDu__DFtjM860pwB96Qdzb8iJOqSU4JOYu5KNE3PsXYPyhwbJY10NDe2UrsL5I4c9BRzPwgGkD_L8ID4NUK0JmE_fWjR1RocOvHdb5cWfwTuMKLvNuMwCgeZb7rn2YJ_lROAmXAGY5ujPoiJTFZOhY-YcfAhLpyHEHRKg"
    await expect(verifyToken(token)).rejects.not.toBeNull()
  });
  it("should reject expired JWT", async () => {
    expect.assertions(1);
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRvdG9AdG90by5jb20ifSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwic3ViIjoxLCJpYXQiOjE2MDQ0MTM0NDYwMDAsImV4cCI6MTYwNDQxNjAzODAwMH0.BtEmNPDUP95RXy7yuAJ_PMCVUVrrYujleRZbt0CUDhdWA8_bIcz0RInnbmTCcVBP5hiFUTYZzm0j8pbKK5h7C3cwdANCY7U4tsWwa92EcdW_4_pgX40dPSfjG7faZh_bYgTbkuOp4BX1A_cFI0H47UNO0S3usO6B1xkfdJ-D3hpDnYIqgelY5kDB9cs9fqpASUGRY4zIXpjFKEO-c8Ccf2MI0ybcaz_Ij8AOlbNQczcjzVSLseuMvMuVVgQ0njsm7R9-sz5ZLzttv-eQuV91xlxK4ycPeo289_wEbNvlp5iLkUNSL7ECUUBShL19KLOlZCdLqsYSrTPMcPqi6WwT1A"
    await expect(verifyToken(token)).rejects.not.toBeNull()
  });

  it("should return privateKey", async () => {
    const key = await getPrivateKey();
    expect(key).not.toBeNull();
  });

})
