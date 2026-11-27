import { describe, expect, it } from "vitest"

import { getSessionUser } from "@/lib/auth"

type ClientArg = Parameters<typeof getSessionUser>[0]

const mockUser = { id: "user-1", email: "owner@example.com" }

function mockClient(result: { user: unknown; error?: unknown }): ClientArg {
  return {
    auth: {
      getUser: async () => ({
        data: { user: result.user },
        error: result.error ?? null,
      }),
    },
  } as unknown as ClientArg
}

describe("getSessionUser", () => {
  it("returns the user when a session exists", async () => {
    expect(await getSessionUser(mockClient({ user: mockUser }))).toEqual(mockUser)
  })

  it("returns null when there is no session", async () => {
    expect(await getSessionUser(mockClient({ user: null }))).toBeNull()
  })

  it("returns null when getUser reports an error", async () => {
    expect(
      await getSessionUser(mockClient({ user: null, error: { message: "bad" } }))
    ).toBeNull()
  })
})
