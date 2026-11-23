import { describe, expect, it } from "vitest"

import { formatPrice } from "@/lib/format"

describe("formatPrice", () => {
  it("formats whole dollars", () => {
    expect(formatPrice(1200)).toBe("$12.00")
  })
  it("formats cents below a dollar", () => {
    expect(formatPrice(99)).toBe("$0.99")
  })
  it("pads single-digit cents with a zero", () => {
    expect(formatPrice(5)).toBe("$0.05")
  })
  it("handles zero", () => {
    expect(formatPrice(0)).toBe("$0.00")
  })
})
