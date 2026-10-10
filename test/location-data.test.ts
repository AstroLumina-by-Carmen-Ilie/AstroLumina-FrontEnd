// Unit tests for the location data layer: country lookup, Romanian county
// data, city data, and loader caching.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Country, loadCities, loadStates } from "../src/utils/location-data.js";

describe("Country", () => {
  it("lists Romania among all countries", () => {
    const romania = Country.getAllCountries().find((c) => c.isoCode === "RO");
    assert.ok(romania);
    assert.equal(romania.name, "Romania");
  });

  it("finds Romania by ISO code", () => {
    assert.equal(Country.getCountryByCode("RO")?.name, "Romania");
  });
});

describe("loadStates", () => {
  it("returns Romanian counties carrying the RO country code", async () => {
    const states = await loadStates();
    const counties = states.getStatesOfCountry("RO");
    assert.ok(counties.length > 0);
    for (const county of counties) {
      assert.equal(county.countryCode, "RO");
      assert.ok(county.isoCode.length > 0);
      assert.ok(county.name.length > 0);
    }
  });

  it("finds Bucharest by code and country", async () => {
    const states = await loadStates();
    const city = states.getStateByCodeAndCountry("B", "RO");
    assert.equal(city?.name, "Bucharest");
  });

  it("caches the loader across calls", async () => {
    assert.equal(await loadStates(), await loadStates());
  });
});

describe("loadCities", () => {
  it("returns cities for Bucharest", async () => {
    const cities = await loadCities();
    const list = cities.getCitiesOfState("RO", "B");
    assert.ok(list.length > 0);
    assert.ok(list.some((c) => c.name === "Bucharest"));
  });

  it("caches the loader across calls", async () => {
    assert.equal(await loadCities(), await loadCities());
  });
});
