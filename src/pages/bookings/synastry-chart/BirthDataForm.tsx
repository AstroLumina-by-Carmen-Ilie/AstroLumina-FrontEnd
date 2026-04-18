import { useState, useEffect } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import DateInput from "@/components/ui/DateInput";
import TimeInput from "@/components/ui/TimeInput";
import {
  LocationCoordinates,
  BirthDataPayload,
  SelectOption,
  UserInfo,
  BirthDataFormProps,
} from "@/types";
import {
  ROMANIAN_COUNTIES,
  getRomanianCountyName,
  getRomanianCities,
  getRomanianCityCoordinates,
  COUNTRY_NAMES_RO,
} from "@/data";

const getInitialFormState = (initial?: {
  payload: BirthDataPayload;
  userInfo: UserInfo;
}) => {
  if (!initial)
    return {
      fullName: "",
      birthDate: null as Date | null,
      birthHour: null as Date | null,
      birthCountry: "",
      birthCounty: "",
      birthCity: "",
      coordinates: null as LocationCoordinates | null,
    };
  return {
    fullName: initial.userInfo.name,
    birthDate: initial.userInfo.birthDate,
    birthHour: initial.userInfo.birthHour,
    birthCountry: initial.userInfo.birthCountry,
    birthCounty: initial.userInfo.birthCounty,
    birthCity: initial.userInfo.birthCity,
    coordinates: {
      lat: initial.payload.latitude,
      lng: initial.payload.longitude,
    } as LocationCoordinates | null,
  };
};

const BirthDataForm: React.FC<BirthDataFormProps> = ({
  initialValues,
  onNext,
  onBack,
  showBackButton = false,
}) => {
  const [formState, setFormState] = useState(
    getInitialFormState(initialValues),
  );

  const [options, setOptions] = useState({
    countryOptions: [{ value: "", label: "Selectează..." }] as SelectOption[],
    countyOptions: [{ value: "", label: "Selectează..." }] as SelectOption[],
    cityOptions: [{ value: "", label: "Selectează..." }] as SelectOption[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const getRomanianCountyCode = (countyName: string): string | undefined => {
    for (const [code, data] of Object.entries(ROMANIAN_COUNTIES)) {
      if (data[0] === countyName) return code;
    }
    return undefined;
  };

  const formatStateName = (stateName: string) => {
    if (!stateName) return "";
    return stateName.replace(
      / County$| State$| Municipality$| Province$| Region$| District$| Voivodeship$| Oblast$| Quarter$| Governorate$/,
      "",
    );
  };

  useEffect(() => {
    try {
      const defaultOptions = [{ value: "", label: "Selectează..." }];
      const countries = Country.getAllCountries().map((country) => ({
        value: country.isoCode,
        label: COUNTRY_NAMES_RO[country.isoCode] || country.name,
      }));

      setOptions((prev) => ({
        ...prev,
        countryOptions: [{ value: "", label: "Selectează..." }, ...countries],
      }));

      if (initialValues?.userInfo.birthCountry) {
        const { birthCountry, birthCounty, birthCity } = initialValues.userInfo;

        const allCountries = Country.getAllCountries();
        const countryObj = allCountries.find(
          (c) => c.name === birthCountry || c.isoCode === birthCountry,
        );
        const countryCode = countryObj?.isoCode || birthCountry;

        let countyCode = birthCounty;
        if (countryCode === "RO") {
          countyCode = getRomanianCountyCode(birthCounty) || birthCounty;
        }

        setFormState((prev) => ({
          ...prev,
          birthCountry: countryCode,
          birthCounty: countyCode,
          birthCity: birthCity || "",
        }));

        setOptions((prev) => ({
          ...prev,
          countryOptions: [
            { value: "", label: "Selectează..." },
            ...allCountries.map((country) => ({
              value: country.isoCode,
              label: COUNTRY_NAMES_RO[country.isoCode] || country.name,
            })),
          ],
        }));

        if (countryCode === "RO") {
          const romaniaCounties = Object.entries(ROMANIAN_COUNTIES).map(
            ([code, [name]]) => ({
              value: code,
              label: name,
            }),
          );
          setOptions((prev) => ({
            ...prev,
            countyOptions: [...defaultOptions, ...romaniaCounties],
          }));

          if (countyCode && ROMANIAN_COUNTIES[countyCode]) {
            const cities = getRomanianCities(countyCode).map((city) => ({
              value: city.name,
              label: city.name,
            }));
            setOptions((prev) => ({
              ...prev,
              cityOptions: [...defaultOptions, ...cities],
            }));
          }
        } else {
          try {
            const counties = State.getStatesOfCountry(birthCountry).map(
              (state) => ({
                value: state.isoCode,
                label: formatStateName(state.name),
              }),
            );
            setOptions((prev) => ({
              ...prev,
              countyOptions: [...defaultOptions, ...counties],
            }));

            if (birthCounty) {
              const cities = City.getCitiesOfState(
                birthCountry,
                birthCounty,
              ).map((city) => ({
                value: city.name,
                label: city.name,
              }));
              setOptions((prev) => ({
                ...prev,
                cityOptions: [...defaultOptions, ...cities],
              }));
            }
          } catch (error) {
            console.error("Error loading counties for non-RO country:", error);
          }
        }
      } else {
        const romania = countries.find((c) => c.value === "RO");
        if (romania) {
          setFormState((prev) => ({
            ...prev,
            birthCountry: romania.value,
          }));

          const romaniaCounties = Object.entries(ROMANIAN_COUNTIES).map(
            ([code, [name]]) => ({
              value: code,
              label: name,
            }),
          );

          setOptions((prev) => ({
            ...prev,
            countyOptions: [...defaultOptions, ...romaniaCounties],
          }));
        }
      }
    } catch (error) {
      console.error("Error initializing countries:", error);
    }
  }, [initialValues]);

  const handleFormChange = (field: string, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

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
      const romaniaCounties = Object.entries(ROMANIAN_COUNTIES).map(
        ([code, [name]]) => ({
          value: code,
          label: name,
        }),
      );

      setOptions((prev) => ({
        ...prev,
        countyOptions: [
          { value: "", label: "Selectează..." },
          ...romaniaCounties,
        ],
        cityOptions: [{ value: "", label: "Selectează..." }],
      }));
      return;
    }

    try {
      const counties = State.getStatesOfCountry(countryCode).map((state) => ({
        value: state.isoCode,
        label: formatStateName(state.name),
      }));

      setOptions((prev) => ({
        ...prev,
        countyOptions: [{ value: "", label: "Selectează..." }, ...counties],
        cityOptions: [{ value: "", label: "Selectează..." }],
      }));
    } catch (error) {
      console.error("Error loading counties:", error);
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

    if (!cityName || !birthCountry || !birthCounty) {
      return;
    }

    try {
      if (birthCountry === "RO" && ROMANIAN_COUNTIES[birthCounty]) {
        const coords = getRomanianCityCoordinates(birthCounty, cityName);
        if (coords) {
          setFormState((prev) => ({
            ...prev,
            coordinates: coords,
          }));
        }
        return;
      }

      const cityData = City.getCitiesOfState(birthCountry, birthCounty).find(
        (city) => city.name === cityName,
      );

      if (cityData && cityData.latitude && cityData.longitude) {
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
    const isValid = Object.keys(newErrors).length === 0;
    return isValid;
  };

  const handleSaveBirthData = async () => {
    const isValid = validateInputs();
    if (!isValid) {
      return;
    }

    try {
      const {
        fullName,
        birthDate,
        birthHour,
        birthCountry,
        birthCounty,
        birthCity,
        coordinates,
      } = formState;

      if (!birthDate || !birthHour || !coordinates) {
        throw new Error("Missing required data for calculation");
      }

      const payload: BirthDataPayload = {
        name: fullName,
        day: birthDate.getDate(),
        month: birthDate.getMonth() + 1,
        year: birthDate.getFullYear(),
        hour: birthHour.getHours(),
        minute: birthHour.getMinutes(),
        city: birthCity,
        nation: birthCountry,
        longitude: coordinates.lng,
        latitude: coordinates.lat,
      };

      const countryName =
        Country.getCountryByCode(birthCountry)?.name || birthCountry;

      let stateName = birthCounty;
      let cityName = birthCity;

      if (birthCountry === "RO" && ROMANIAN_COUNTIES[birthCounty]) {
        stateName = getRomanianCountyName(birthCounty);
      } else {
        stateName =
          State.getStateByCodeAndCountry(birthCounty, birthCountry)?.name ||
          birthCounty;
        const cities = City.getCitiesOfState(birthCountry, birthCounty);
        cityName = cities.find((c) => c.name === birthCity)?.name || birthCity;
      }

      const userInfo = {
        name: fullName,
        birthDate: birthDate,
        birthHour: birthHour,
        location: `${cityName}, ${formatStateName(stateName)}, ${countryName}`,
        birthCountry: countryName,
        birthCounty: stateName,
        birthCity: cityName,
      };

      onNext(payload, userInfo);
    } catch (error) {
      console.error("Error saving data:", error);
      setErrors((prev) => ({
        ...prev,
        calculation: "Salvarea datelor a eșuat. Încercați din nou.",
      }));
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
      "&:hover": { borderColor: "rgba(168,85,247,0.5)" },
    }),
    singleValue: (base: any) => ({ ...base, color: "#f3e8ff" }),
    input: (base: any) => ({ ...base, color: "#f3e8ff" }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "#1e1b4b",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "0.75rem",
      overflow: "hidden",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? "rgba(168,85,247,0.2)" : "transparent",
      color: state.isFocused ? "#f3e8ff" : "#c084fc",
      "&:hover": { backgroundColor: "rgba(168,85,247,0.2)" },
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
          className="p-3 w-full rounded-xl border transition-colors bg-white/5 border-white/15 text-cosmic-100 placeholder-cosmic-500 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500"
          placeholder="Introdu numele tău..."
          value={formState.fullName}
          onChange={(e) => handleFormChange("fullName", e.target.value)}
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
          onChange={(date) => handleFormChange("birthDate", date)}
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
          onChange={(date) => handleFormChange("birthHour", date)}
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
              (option) => option.value === formState.birthCountry,
            ) || null
          }
          onChange={handleCountryChange}
          styles={selectStyles}
          placeholder="Selectează țara..."
          isSearchable
          required
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
              (option) => option.value === formState.birthCounty,
            ) || null
          }
          onChange={handleCountyChange}
          styles={selectStyles}
          placeholder="Selectează județul..."
          isSearchable
          isDisabled={!formState.birthCountry}
          required
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
            options.cityOptions.find(
              (option) => option.value === formState.birthCity,
            ) || null
          }
          onChange={handleCityChange}
          styles={selectStyles}
          placeholder="Selectează orașul..."
          isSearchable
          isDisabled={!formState.birthCounty}
          required
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

      <div className="flex gap-4 pt-2">
        {showBackButton && onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 rounded-xl border transition-colors cursor-pointer bg-white/5 text-cosmic-200 hover:bg-white/10 border-white/10"
          >
            Pasul anterior
          </button>
        )}
        <button
          type="button"
          className={`${showBackButton && onBack ? "flex-1" : "w-full"} py-3 px-6 bg-gradient-to-r from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 text-white font-semibold rounded-xl shadow-glow-purple transition-all duration-300 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={handleSaveBirthData}
        >
          Pasul următor
        </button>
      </div>
    </div>
  );
};

export default BirthDataForm;
