import Country from "country-state-city/lib/country.js";

export { Country };

export interface StateEntry {
  isoCode: string;
  name: string;
  countryCode: string;
}

export interface CityEntry {
  name: string;
  countryCode: string;
  stateCode: string;
  latitude?: string | null;
  longitude?: string | null;
}

interface StateModule {
  getStatesOfCountry(countryCode: string): StateEntry[];
  getStateByCodeAndCountry(
    stateCode: string,
    countryCode: string,
  ): StateEntry | undefined;
}

interface CityModule {
  getCitiesOfState(countryCode: string, stateCode: string): CityEntry[];
}

let statesPromise: Promise<StateModule> | undefined;
let citiesPromise: Promise<CityModule> | undefined;

export function loadStates(): Promise<StateModule> {
  if (!statesPromise) {
    statesPromise = import("country-state-city/lib/state.js").then(
      (module) => module.default as StateModule,
    );
  }
  return statesPromise;
}

export function loadCities(): Promise<CityModule> {
  if (!citiesPromise) {
    citiesPromise = import("country-state-city/lib/city.js").then(
      (module) => module.default as CityModule,
    );
  }
  return citiesPromise;
}
