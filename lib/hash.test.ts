import { describe, expect, it } from "vitest"

import { hashIp } from "@/lib/hash"

describe("hashIp", () => {
  it("returns a 64-character hex digest", () => {
    expect(hashIp("1.2.3.4", "salt")).toMatch(/^[0-9a-f]{64}$/)
  })
  it("is deterministic for the same ip and salt", () => {
    expect(hashIp("1.2.3.4", "salt")).toBe(hashIp("1.2.3.4", "salt"))
  })
  it("differs across ips", () => {
    expect(hashIp("1.2.3.4", "salt")).not.toBe(hashIp("5.6.7.8", "salt"))
  })
  it("differs across salts", () => {
    expect(hashIp("1.2.3.4", "a")).not.toBe(hashIp("1.2.3.4", "b"))
  })
  // Golden vector: locks the exact sha256 output so scan dedupe stays
  // compatible with hashes already stored in menu_scans.
  it("matches the known sha256 vector for ip+salt", () => {
    expect(hashIp("1.2.3.4", "salt")).toBe(
      "eef3a782b98f14c5e62afb8ebd9932ef797dbe360e437abb4028e853222befb1"
    )
  })
})
