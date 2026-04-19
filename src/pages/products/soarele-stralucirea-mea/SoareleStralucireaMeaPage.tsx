import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/navbar/Navbar";
import { BirthDataPayload, SelectOption, LocationCoordinates } from "@/types";
import { sendSoareleStralucireaEmail } from "@/utils/email";
import {
  ROMANIAN_COUNTIES,
  getRomanianCities,
  getRomanianCityCoordinates,
  COUNTRY_NAMES_RO,
} from "@/data";
import DateInput from "@/components/ui/DateInput";
import TimeInput from "@/components/ui/TimeInput";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

const ASTROLOGICAL_API_URL = import.meta.env.VITE_ASTROLOGICAL_API_URL;

const SoareleStralucireaMeaPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [sunSign, setSunSign] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formState, setFormState] = useState({
    fullName: "",
    birthDate: null as Date | null,
    birthHour: null as Date | null,
    birthCountry: "",
    birthCounty: "",
    birthCity: "",
    coordinates: null as LocationCoordinates | null,
  });

  const [options, setOptions] = useState({
    countryOptions: [{ value: "", label: "Selectează..." }] as SelectOption[],
    stateOptions: [{ value: "", label: "Selectează..." }] as SelectOption[],
    cityOptions: [{ value: "", label: "Selectează..." }] as SelectOption[],
  });

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
          stateOptions: [...defaultOptions, ...romaniaCounties],
        }));
      }
    } catch (error) {
      console.error("Error initializing countries:", error);
    }
  }, []);

  const formatStateName = (stateName: string) => {
    if (!stateName) return "";
    return stateName.replace(
      / County$| State$| Municipality$| Province$| Region$| District$| Voivodeship$| Oblast$| Quarter$| Governorate$/,
      "",
    );
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
        stateOptions: [{ value: "", label: "Selectează..." }],
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
        stateOptions: [
          { value: "", label: "Selectează..." },
          ...romaniaCounties,
        ],
        cityOptions: [{ value: "", label: "Selectează..." }],
      }));
      return;
    }

    try {
      const states = State.getStatesOfCountry(countryCode).map((state) => ({
        value: state.isoCode,
        label: formatStateName(state.name),
      }));

      setOptions((prev) => ({
        ...prev,
        stateOptions: [{ value: "", label: "Selectează..." }, ...states],
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
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculateSunSign = async () => {
    const isValid = validateInputs();
    if (!isValid) {
      return;
    }

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
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      const sunData = response.data?.chart_data?.subject?.Sun;
      if (sunData?.sign) {
        setSunSign(sunData.sign);
        setCurrentStep(2);
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

  const handleSendEmail = async () => {
    if (!customerEmail) {
      alert("Te rugăm să introduci un email valid.");
      return;
    }

    setIsSendingEmail(true);
    try {
      const result = await sendSoareleStralucireaEmail(customerEmail);
      if (result.success) {
        setEmailSent(true);
      } else {
        alert(
          "A apărut o eroare la trimiterea email-ului. Te rugăm să încerci din nou.",
        );
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("A apărut o eroare. Te rugăm să încerci dinnou.");
    } finally {
      setIsSendingEmail(false);
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
      overflow: "hidden",
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
    <div className="min-h-screen text-white bg-midnight-950">
      <Navbar isScrolled={true} />

      <main className="container px-6 pt-24 pb-16 mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r font-display from-cosmic-300 to-gold-400">
            Soarele, Strălucirea Ta
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-cosmic-300">
            Descoperă care este zodia Soarelui tău și cadoul pe care ți-l oferim
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden glass-card">
            <div className="flex flex-col md:flex-row">
              <div
                aria-label="Panoul de informare"
                className="hidden flex-col justify-center p-8 bg-gradient-to-br to-transparent md:flex md:w-1/2 from-cosmic-900/30"
              >
                <h2 className="mb-6 text-3xl font-bold text-white font-display">
                  Soarele, Strălucirea Ta
                </h2>
                <div className="mb-8 space-y-4 leading-relaxed text-cosmic-200/80">
                  <p>
                    Soarele tale natal reprezintă esența ta - cine ești tu cu
                    adevărat, forța ta interioară și modul în care te exprimi în
                    lume.
                  </p>
                  <p>
                    De la ce semn zodiacal aparține Soarele tău? Această
                    informație simplă poate dezvălui multe despre:
                  </p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Cum îți exprimi creativitatea</li>
                    <li>Care sunt talentele tale naturale</li>
                    <li>Ce te face să strălucești</li>
                    <li>Rolul tău în relații</li>
                  </ul>
                  <p>
                    Completează formularul și vei primi un PDF cadou cu toate
                    detaliile despre zodia ta solară.
                  </p>
                </div>

                <div aria-label="Indicatorii pașilor" className="space-y-3">
                  {[
                    { num: 1, label: "Data nașterii" },
                    { num: 2, label: "Email" },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-3 items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                          step.num === currentStep
                            ? "step-active text-white"
                            : step.num < currentStep
                              ? "step-completed text-white"
                              : "step-pending text-cosmic-400"
                        }`}
                      >
                        {step.num < currentStep ? "✓" : step.num}
                      </div>
                      <span
                        className={`text-sm ${step.num === currentStep ? "text-white" : "text-cosmic-400"}`}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                aria-label="Formularul principal"
                className="p-8 w-full md:w-1/2"
              >
                <div className="mb-8 md:hidden">
                  <div className="flex justify-between items-center mb-4">
                    {[1, 2].map((step) => (
                      <div
                        key={step}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                          step === currentStep
                            ? "step-active text-white"
                            : step < currentStep
                              ? "step-completed text-white"
                              : "step-pending text-cosmic-400"
                        }`}
                      >
                        {step < currentStep ? "✓" : step}
                      </div>
                    ))}
                  </div>
                  <div className="h-1 rounded-full bg-white/10">
                    <div
                      className="h-full bg-gradient-to-r rounded-full transition-all duration-500 from-cosmic-500 to-cosmic-400"
                      style={{ width: `${((currentStep - 1) / 1) * 100}%` }}
                    />
                  </div>
                </div>

                {currentStep === 1 && (
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
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                        required
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.fullName}
                        </p>
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
                        <p className="mt-1 text-xs text-red-400">
                          {errors.birthDate}
                        </p>
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
                        <p className="mt-1 text-xs text-red-400">
                          {errors.birthHour}
                        </p>
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
                        <p className="mt-1 text-xs text-red-400">
                          {errors.birthCountry}
                        </p>
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
                        options={options.stateOptions}
                        value={
                          options.stateOptions.find(
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
                        <p className="mt-1 text-xs text-red-400">
                          {errors.birthCounty}
                        </p>
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
                        <p className="mt-1 text-xs text-red-400">
                          {errors.birthCity}
                        </p>
                      )}
                    </div>

                    {errors.calculation && (
                      <div className="p-3 text-sm text-red-400 rounded-xl border bg-red-500/10 border-red-500/20">
                        {errors.calculation}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleCalculateSunSign}
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
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    {emailSent ? (
                      <div className="py-12 text-center">
                        <div className="inline-flex justify-center items-center mb-6 w-20 h-20 rounded-full bg-emerald-500/20">
                          <span className="text-4xl text-emerald-400">✓</span>
                        </div>
                        <h2 className="mb-4 text-2xl font-bold text-white">
                          Produsul ajunge la tine în câteva minute!
                        </h2>
                        <p className="mb-8 text-cosmic-300">
                          Verifică-ți inbox-ul (și spam-ul) - acolo vei găsi
                          informațiile.
                        </p>
                        <button
                          onClick={() => navigate("/produse")}
                          className="px-6 py-3 rounded-xl border transition-colors cursor-pointer bg-white/5 text-cosmic-200 hover:bg-white/10 border-white/10"
                        >
                          Înapoi la produse
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="p-6 bg-gradient-to-r rounded-xl border from-cosmic-900/30 to-gold-900/20 border-white/10">
                          <p className="mb-2 text-center text-cosmic-300">
                            Zodia Soarelui tău
                          </p>
                          <h3 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cosmic-300 to-gold-400">
                            {sunSign}
                          </h3>
                        </div>

                        <div>
                          <label
                            className="block mb-2 text-sm text-cosmic-300"
                            htmlFor="email"
                          >
                            Email pentru trimitere informații
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="p-3 w-full rounded-xl border transition-colors bg-white/5 border-white/15 text-cosmic-100 placeholder-cosmic-500 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500"
                            placeholder="email@exemplu.ro"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            required
                          />
                        </div>

                        <button
                          type="button"
                          onClick={handleSendEmail}
                          disabled={isSendingEmail}
                          className="flex justify-center items-center px-6 py-3 w-full font-semibold text-white bg-gradient-to-r rounded-xl transition-all duration-300 cursor-pointer from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 shadow-glow-purple disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSendingEmail ? (
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
                              Se trimite...
                            </>
                          ) : (
                            "Trimite-mi informațiile"
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="px-6 py-3 w-full rounded-xl border transition-colors cursor-pointer bg-white/5 text-cosmic-200 hover:bg-white/10 border-white/10"
                        >
                          Pasul anterior
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SoareleStralucireaMeaPage;
