// Unit tests for the frontend env validation: importing the config without
// the required variables must fail loudly instead of booting half-configured.
// Kept in a separate file so the throwing import cannot poison other tests:
// node:test isolates files from each other.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { DUMMY_ENV } from "./setup-env.js";

describe("frontend env validation", () => {
  it("throws when a required variable is missing", async () => {
    const incomplete = Object.fromEntries(
      Object.entries(DUMMY_ENV).filter(([key]) => key !== "STRIPE_PK"),
    );
    (globalThis as { window?: unknown }).window = { ENV: incomplete };
    await assert.rejects(
      () => import("../src/config/index.js?validation-missing"),
      /ENV ERROR/,
    );
  });
});
