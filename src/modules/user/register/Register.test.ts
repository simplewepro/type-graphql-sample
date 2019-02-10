import { gCall } from "./../../../test-utils/gCall";
import { testConn } from "../../../test-utils/testConn";
import { Connection } from "typeorm";

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

describe("Register", () => {
  it("Create user", async () => {
    await gCall({
      source: ""
    });
  });
});
