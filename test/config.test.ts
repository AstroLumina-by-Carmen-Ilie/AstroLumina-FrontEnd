// Unit tests for the frontend env wiring: explicit API URLs pass through,
// numeric ports are coerced, and DNS names are exported unchanged.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { DUMMY_ENV } from "./setup-env.js";

const config = await import("../src/config/index.js");

describe("frontend env config", () => {
  it("passes the explicit API base URLs through", () => {
    assert.equal(config.ASTROLOGY_API_URL, DUMMY_ENV["ASTROLOGY_API_URL"]);
    assert.equal(config.PAYMENT_API_URL, DUMMY_ENV["PAYMENT_API_URL"]);
    assert.equal(config.BOOKING_API_URL, DUMMY_ENV["BOOKING_API_URL"]);
  });

  it("coerces the frontend port to a number", () => {
    assert.equal(config.FRONTEND_SERVER_PORT, 80);
  });

  it("exports the DC/K8S pair values unchanged", () => {
    assert.equal(config.ASTROLOGY_API_SERVER_DC_PORT, 3031);
    assert.equal(config.ASTROLOGY_API_SERVER_DC_DNS, "dc.test.local");
    assert.equal(config.BOOKING_API_SERVER_K8S_PORT, 3133);
    assert.equal(config.PAYMENT_API_SERVER_K8S_DNS, "k8s.test.local");
    assert.equal(config.FRONTEND_SERVER_DC_PORT, 8080);
  });

  it("exports secrets and keys", () => {
    assert.equal(config.STRIPE_PK, "pk_test_dummy");
    assert.equal(config.R2_BASE_URL, "https://r2.test.local");
    assert.equal(config.NODE_ENV, "development");
  });
});
