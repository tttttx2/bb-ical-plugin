import { default as HTTP } from "../src"
import { describe, it, beforeAll, expect } from "@jest/globals"

describe("test the query types", () => {
  let integration: any
  beforeAll(() => {
    integration = new HTTP.integration({ url: "http://www.google.com", cookie: "" })
  })

  async function catchError(cb: any) {
    let error: any
    try {
      await cb()
    } catch (err: any) {
      error = err.message
    }
    expect(error).not.toBeNull()
  }

  it("should run the read query", async () => {
    const response = await integration.read()
    expect(typeof response).toBe("string")
  })

})
