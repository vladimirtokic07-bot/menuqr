import { createHash } from "node:crypto"

/**
 * Hashes a visitor IP with a server-side salt for anonymous scan analytics.
 * Pure function: the salt is injected so it can be unit-tested without env vars.
 */
export function hashIp(ip: string, salt: string): string {
  return createHash("sha256").update(`${ip}${salt}`).digest("hex")
}
