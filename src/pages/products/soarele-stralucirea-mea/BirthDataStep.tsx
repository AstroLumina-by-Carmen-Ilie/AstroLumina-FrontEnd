import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { BirthDataPayload, SelectOption, LocationCoordinates } from "@/types";
import DateInput from "@/components/ui/DateInput";
import TimeInput from "@/components/ui/TimeInput";
import {
  ROMANIAN_COUNTIES,
  getRomanianCities,
  getRomanianCityCoordinates,
  COUNTRY_NAMES_RO,
} from "@/data";

const ASTROLOGICAL_API_URL = import.meta.env.VITE_ASTROLOGICAL_API_URL;

interface BirthDataStepProps {
  onNext: (sunSign: string) => void;
}

const BirthDataStep: React.FC<BirthDataStepProps> = ({
  onNext
}) => {
  const [formState, setFormState] = useState({
    fullName: "",
    birthDate: null as Date | null,
    birthHour: null as Date | null,
    birthCountry: "RO",
    birthCounty: "",
    birthCity: "",
    coordinates: null as LocationCoordinates | null,
  });

  const [options, setOptions] = useState({
    countryOptions: [{ value: "", label: "Selectează..." }] as SelectOption[],
    countyOptions: [{ value: "", label: "Selectează..." }] as SelectOption[],
    cityOptions: [{ value: "", label: "Selectează..." }] as SelectOption[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    try {
      const countries = Country.getAllCountries().map((country) => ({
        value: country.isoCode,
        label: COUNTRY_NAMES_RO[country.isoCode] || country.name,
      }));

      const counties = Object.entries(ROMANIAN_COUNTIES).map(
        ([code, [name]]) => ({
          value: code,
          label: name,
        }),
      );

      setOptions({
        countryOptions: [{ value: "", label: "Selectează..." }, ...countries],
        countyOptions: [{ value: "", label: "Selectează..." }, ...counties],
        cityOptions: [{ value: "", label: "Selectează..." }],
      });
    } catch (error) {
      console.error("Error initializing:", error);
    }
  }, []);

  const handleCountryChange = (option: SelectOption | null) => {
    const countryCode = option?.value || "";
    setFormState((prev) => ({
      ...prev,
      birthCountry: countryCode,
      birthCounty: "",
      birthCity: "",
      coordinates: null,
    }));

    if (!countryCode) {
      setOptions((prev) => ({
        ...prev,
        countyOptions: [{ value: "", label: "Selectează..." }],
        cityOptions: [{ value: "", label: "Selectează..." }],
      }));
      return;
    }

    if (countryCode === "RO") {
      const counties = Object.entries(ROMANIAN_COUNTIES).map(
        ([code, [name]]) => ({
          value: code,
          label: name,
        }),
      );
      setOptions((prev) => ({
        ...prev,
        countyOptions: [{ value: "", label: "Selectează..." }, ...counties],
        cityOptions: [{ value: "", label: "Selectează..." }],
      }));
      return;
    }

    try {
      const states = State.getStatesOfCountry(countryCode).map((state) => ({
        value: state.isoCode,
        label: state.name.replace(
          / County$| State$| Municipality$| Province$| Region$| District$/,
          "",
        ),
      }));
      setOptions((prev) => ({
        ...prev,
        countyOptions: [{ value: "", label: "Selectează..." }, ...states],
        cityOptions: [{ value: "", label: "Selectează..." }],
      }));
    } catch (error) {
      console.error("Error loading states:", error);
    }
  };

  const handleCountyChange = (option: SelectOption | null) => {
    const countyCode = option?.value || "";
    const { birthCountry } = formState;

    setFormState((prev) => ({
      ...prev,
      birthCounty: countyCode,
      birthCity: "",
      coordinates: null,
    }));

    if (!countyCode || !birthCountry) {
      setOptions((prev) => ({
        ...prev,
        cityOptions: [{ value: "", label: "Selectează..." }],
      }));
      return;
    }

    if (birthCountry === "RO" && ROMANIAN_COUNTIES[countyCode]) {
      const cities = getRomanianCities(countyCode).map((city) => ({
        value: city.name,
        label: city.name,
      }));
      setOptions((prev) => ({
        ...prev,
        cityOptions: [{ value: "", label: "Selectează..." }, ...cities],
      }));
      return;
    }

    try {
      const cities = City.getCitiesOfState(birthCountry, countyCode).map(
        (city) => ({
          value: city.name,
          label: city.name,
        }),
      );
      setOptions((prev) => ({
        ...prev,
        cityOptions: [{ value: "", label: "Selectează..." }, ...cities],
      }));
    } catch (error) {
      console.error("Error loading cities:", error);
    }
  };

  const handleCityChange = (option: SelectOption | null) => {
    const cityName = option?.value || "";
    const { birthCountry, birthCounty } = formState;

    setFormState((prev) => ({
      ...prev,
      birthCity: cityName,
      coordinates: null,
    }));

    if (!cityName || !birthCountry || !birthCounty) return;

    try {
      if (birthCountry === "RO" && ROMANIAN_COUNTIES[birthCounty]) {
        const coords = getRomanianCityCoordinates(birthCounty, cityName);
        if (coords) {
          setFormState((prev) => ({ ...prev, coordinates: coords }));
        }
        return;
      }

      const cityData = City.getCitiesOfState(birthCountry, birthCounty).find(
        (city) => city.name === cityName,
      );
      if (cityData?.latitude && cityData?.longitude) {
        setFormState((prev) => ({
          ...prev,
          coordinates: {
            lat: Number(cityData.latitude),
            lng: Number(cityData.longitude),
          },
        }));
      }
    } catch (error) {
      console.error("Error setting coordinates:", error);
    }
  };

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.fullName.trim())
      newErrors.fullName = "Numele complet este obligatoriu";
    if (!formState.birthDate)
      newErrors.birthDate = "Data nașterii este obligatorie";
    if (!formState.birthHour)
      newErrors.birthHour = "Ora nașterii este obligatorie";
    if (!formState.birthCountry)
      newErrors.birthCountry = "Țara nașterii este obligatorie";
    if (!formState.birthCounty)
      newErrors.birthCounty = "Județul nașterii este obligatoriu";
    if (!formState.birthCity)
      newErrors.birthCity = "Orașul nașterii este obligatoriu";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = async () => {
    if (!validateInputs()) return;

    setIsCalculating(true);
    try {
      const {
        birthDate,
        birthHour,
        coordinates,
        fullName,
        birthCountry,
        birthCounty,
        birthCity,
      } = formState;
      if (!birthDate || !birthHour || !coordinates) {
        throw new Error("Lipsesc datele necesare");
      }

      const payload: BirthDataPayload = {
        name: fullName,
        nation: birthCountry,
        city: birthCity,
        longitude: coordinates.lng,
        latitude: coordinates.lat,
        year: birthDate.getFullYear(),
        month: birthDate.getMonth() + 1,
        day: birthDate.getDate(),
        hour: birthHour.getHours(),
        minute: birthHour.getMinutes(),
      };

      const response = await axios.post(
        `${ASTROLOGICAL_API_URL}/api/v2/ro/birth-data`,
        payload,
        { headers: { "Content-Type": "application/json" } },
      );

      const sunData = response.data?.chart_data?.subject?.Sun;
      if (sunData?.sign) {
        onNext(sunData.sign);
      } else {
        setErrors((prev) => ({
          ...prev,
          calculation:
            "Nu am putut identifica zodia. Te rugăm să încerci din nou.",
        }));
      }
    } catch (error) {
      console.error("Error calculating sun sign:", error);
      setErrors((prev) => ({
        ...prev,
        calculation: "A apărut o eroare. Te rugăm să încerci din nou.",
      }));
    } finally {
      setIsCalculating(false);
    }
  };

  const selectStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: "rgba(255,255,255,0.05)",
      borderColor: "rgba(255,255,255,0.15)",
      borderRadius: "0.75rem",
      color: "white",
      minHeight: "48px",
    }),
    singleValue: (base: any) => ({ ...base, color: "#f3e8ff" }),
    input: (base: any) => ({ ...base, color: "#f3e8ff" }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "#1e1b4b",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "0.75rem",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? "rgba(168,85,247,0.2)" : "transparent",
      color: state.isFocused ? "#f3e8ff" : "#c084fc",
    }),
    placeholder: (base: any) => ({ ...base, color: "#a855f7" }),
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
  };

  return (
    <div className="space-y-5">
      <div>
        <label
          className="block mb-2 text-sm text-cosmic-300"
          htmlFor="fullName"
        >
          Nume complet
        </label>
        <input
          type="text"
          id="fullName"
          className="p-3 w-full rounded-xl border bg-white/5 border-white/15 text-cosmic-100 placeholder-cosmic-500 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500"
          placeholder="Introdu numele tău..."
          value={formState.fullName}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, fullName: e.target.value }))
          }
          required
        />
        {errors.fullName && (
          <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label
          className="block mb-2 text-sm text-cosmic-300"
          htmlFor="birthDate"
        >
          Data nașterii
        </label>
        <DateInput
          value={formState.birthDate}
          onChange={(date) =>
            setFormState((prev) => ({ ...prev, birthDate: date }))
          }
          placeholder="Selectează data..."
          id="birthDate"
          required
        />
        {errors.birthDate && (
          <p className="mt-1 text-xs text-red-400">{errors.birthDate}</p>
        )}
      </div>

      <div>
        <label
          className="block mb-2 text-sm text-cosmic-300"
          htmlFor="birthHour"
        >
          Ora nașterii
        </label>
        <TimeInput
          value={formState.birthHour}
          onChange={(date) =>
            setFormState((prev) => ({ ...prev, birthHour: date }))
          }
          placeholder="Selectează ora..."
          id="birthHour"
          required
        />
        {errors.birthHour && (
          <p className="mt-1 text-xs text-red-400">{errors.birthHour}</p>
        )}
      </div>

      <div>
        <label
          className="block mb-2 text-sm text-cosmic-300"
          htmlFor="birthCountry"
        >
          Țara nașterii
        </label>
        <Select
          id="birthCountry"
          options={options.countryOptions}
          value={
            options.countryOptions.find(
              (o) => o.value === formState.birthCountry,
            ) || null
          }
          onChange={handleCountryChange}
          styles={selectStyles}
          placeholder="Selectează țara..."
          isSearchable
          maxMenuHeight={210}
          menuPortalTarget={
            typeof document !== "undefined" ? document.body : null
          }
          menuPosition="fixed"
        />
        {errors.birthCountry && (
          <p className="mt-1 text-xs text-red-400">{errors.birthCountry}</p>
        )}
      </div>

      <div>
        <label
          className="block mb-2 text-sm text-cosmic-300"
          htmlFor="birthCounty"
        >
          Județ/Regiune
        </label>
        <Select
          id="birthCounty"
          options={options.countyOptions}
          value={
            options.countyOptions.find(
              (o) => o.value === formState.birthCounty,
            ) || null
          }
          onChange={handleCountyChange}
          styles={selectStyles}
          placeholder="Selectează județul..."
          isSearchable
          isDisabled={!formState.birthCountry}
          maxMenuHeight={210}
          menuPortalTarget={
            typeof document !== "undefined" ? document.body : null
          }
          menuPosition="fixed"
        />
        {errors.birthCounty && (
          <p className="mt-1 text-xs text-red-400">{errors.birthCounty}</p>
        )}
      </div>

      <div>
        <label
          className="block mb-2 text-sm text-cosmic-300"
          htmlFor="birthCity"
        >
          Orașul nașterii
        </label>
        <Select
          id="birthCity"
          options={options.cityOptions}
          value={
            options.cityOptions.find((o) => o.value === formState.birthCity) ||
            null
          }
          onChange={handleCityChange}
          styles={selectStyles}
          placeholder="Selectează orașul..."
          isSearchable
          isDisabled={!formState.birthCounty}
          maxMenuHeight={210}
          menuPortalTarget={
            typeof document !== "undefined" ? document.body : null
          }
          menuPosition="fixed"
        />
        {errors.birthCity && (
          <p className="mt-1 text-xs text-red-400">{errors.birthCity}</p>
        )}
      </div>

      {errors.calculation && (
        <div className="p-3 text-sm text-red-400 rounded-xl border bg-red-500/10 border-red-500/20">
          {errors.calculation}
        </div>
      )}

      <button
        type="button"
        onClick={handleCalculate}
        disabled={isCalculating}
        className="flex justify-center items-center px-6 py-3 w-full font-semibold text-white bg-gradient-to-r rounded-xl transition-all duration-300 cursor-pointer from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 shadow-glow-purple disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isCalculating ? (
          <>
            <svg
              className="mr-2 w-4 h-4 animate-spin"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle
                cx="8"
                cy="8"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="22"
                strokeDashoffset="0"
              />
            </svg>
            Se calculează...
          </>
        ) : (
          "Descoperă zodia Soarelui"
        )}
      </button>
    </div>
  );
};

export default BirthDataStep;
