import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { LocationCoordinates, BirthDataPayload, SelectOption, AstralPositions, AstralHouses } from '../../../types/astralPositions';
import { calculateAstralPositions } from '../utilities/astrologicalCalculations';

interface BirthDataFormProps {
  setResult: React.Dispatch<React.SetStateAction<{astral_elements: AstralPositions, astral_houses: AstralHouses} | null>>;
  setUserInfo: React.Dispatch<React.SetStateAction<{
    name: string;
    birthDate: Date;
    birthHour: Date;
    location: string;
  } | null>>;
}

const BirthDataForm: React.FC<BirthDataFormProps> = ({ setResult, setUserInfo }) => {
  // Form state
  const [formState, setFormState] = useState({
    fullName: '',
    birthDate: null as Date | null,
    birthHour: null as Date | null,
    birthCountry: '',
    birthCounty: '',
    birthCity: '',
    coordinates: null as LocationCoordinates | null,
    isCalculating: false
  });

  // Options state - separate from form state to reduce re-renders
  const [options, setOptions] = useState({
    countryOptions: [{ value: '', label: 'Selectează...' }] as SelectOption[],
    stateOptions: [{ value: '', label: 'Selectează...' }] as SelectOption[],
    cityOptions: [{ value: '', label: 'Selectează...' }] as SelectOption[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatStateName = (stateName: string) => {
    if (!stateName) return '';
    return stateName.replace(/ County$| State$| Municipality$| Province$| Region$| District$| Voivodeship$| Oblast$| Quarter$| Governorate$/, '');
  };

  // Initialize country options once on mount
  useEffect(() => {
    // Initialize country options
    try {
      const defaultOptions = [{ value: '', label: 'Selectează...' }];
      const countries = Country.getAllCountries().map(country => ({
        value: country.isoCode,
        label: country.name
      }));

      setOptions(prev => ({
        ...prev,
        countryOptions: [{ value: '', label: 'Selectează...' }, ...countries]
      }));

      // Set Romania as default
      const romania = countries.find(c => c.label === 'Romania');

      if (romania) {
        // Set country and immediately load its states
        setFormState(prev => ({
          ...prev,
          birthCountry: romania.value
        }));

        // Pre-load states for Romania
        const romaniaStates = State.getStatesOfCountry(romania.value).map(state => ({
          value: state.isoCode,
          label: formatStateName(state.name)
        }));

        setOptions(prev => ({
          ...prev,
          stateOptions: [...defaultOptions, ...romaniaStates]
        }));
      }
    } catch (error) {
      console.error('Error initializing countries:', error);
    }
  }, []); // Empty dependency array ensures this runs only once

  // Simple form field change handler
  const handleFormChange = (field: string, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  // Handle country selection - load states
  const handleCountryChange = (option: SelectOption | null) => {
    const countryCode = option?.value || '';

    // Update form state with new country
    setFormState(prev => ({
      ...prev,
      birthCountry: countryCode,
      birthCounty: '', // Reset county
      birthCity: '',   // Reset city
      coordinates: null // Reset coordinates
    }));

    // If no country selected, reset state options
    if (!countryCode) {
      setOptions(prev => ({
        ...prev,
        stateOptions: [{ value: '', label: 'Selectează...' }],
        cityOptions: [{ value: '', label: 'Selectează...' }]
      }));
      return;
    }

    // Load states for selected country
    try {
      const states = State.getStatesOfCountry(countryCode).map(state => ({
        value: state.isoCode,
        label: formatStateName(state.name)
      }));

      setOptions(prev => ({
        ...prev,
        stateOptions: [{ value: '', label: 'Selectează...' }, ...states],
        cityOptions: [{ value: '', label: 'Selectează...' }]
      }));
    } catch (error) {
      console.error('Error loading states:', error);
    }
  };

  // Handle county/state selection - load cities
  const handleCountyChange = (option: SelectOption | null) => {
    const countyCode = option?.value || '';
    const { birthCountry } = formState;

    // Update form state with new county
    setFormState(prev => ({
      ...prev,
      birthCounty: countyCode,
      birthCity: '',   // Reset city
      coordinates: null // Reset coordinates
    }));

    // If no county selected or no country selected, reset city options
    if (!countyCode || !birthCountry) {
      setOptions(prev => ({
        ...prev,
        cityOptions: [{ value: '', label: 'Selectează...' }]
      }));
      return;
    }

    // Load cities for selected county
    try {
      const cities = City.getCitiesOfState(birthCountry, countyCode).map(city => ({
        value: city.name,
        label: city.name
      }));

      setOptions(prev => ({
        ...prev,
        cityOptions: [{ value: '', label: 'Selectează...' }, ...cities]
      }));
    } catch (error) {
      console.error('Error loading cities:', error);
    }
  };

  // Handle city selection - set coordinates
  const handleCityChange = (option: SelectOption | null) => {
    const cityName = option?.value || '';
    const { birthCountry, birthCounty } = formState;

    // Update form state with new city
    setFormState(prev => ({
      ...prev,
      birthCity: cityName,
      coordinates: null // Reset coordinates initially
    }));

    // If no city selected or missing country/county, return
    if (!cityName || !birthCountry || !birthCounty) {
      return;
    }

    // Set coordinates for selected city
    try {
      const cityData = City.getCitiesOfState(birthCountry, birthCounty)
        .find(city => city.name === cityName);

      if (cityData && cityData.latitude && cityData.longitude) {
        setFormState(prev => ({
          ...prev,
          coordinates: {
            lat: Number(cityData.latitude),
            lng: Number(cityData.longitude)
          }
        }));
      }
    } catch (error) {
      console.error('Error setting coordinates:', error);
    }
  };

  // Validate all inputs
  const validateInputs = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.fullName.trim()) newErrors.fullName = 'Numele complet este obligatoriu';
    if (!formState.birthDate) newErrors.birthDate = 'Data nașterii este obligatorie';
    if (!formState.birthHour) newErrors.birthHour = 'Ora nașterii este obligatorie';
    if (!formState.birthCountry) newErrors.birthCountry = 'Țara nașterii este obligatorie';
    if (!formState.birthCounty) newErrors.birthCounty = 'Județul nașterii este obligatoriu';
    if (!formState.birthCity) newErrors.birthCity = 'Orașul nașterii este obligatoriu';

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    return isValid;
  };

  const handleCalculatePositions = async () => {
    const isValid = validateInputs();
    if (!isValid) {
      return;
    }

    setFormState(prev => ({ ...prev, isCalculating: true }));

    try {
      const { birthDate, birthHour, coordinates, fullName, birthCountry, birthCounty, birthCity } = formState;

      if (!birthDate || !birthHour || !coordinates) {
        throw new Error('Missing required data for calculation');
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

      // Get the actual location names for display
      const country = Country.getCountryByCode(birthCountry)?.name || birthCountry;
      const state = State.getStateByCodeAndCountry(birthCounty, birthCountry)?.name || birthCounty;
      const cities = City.getCitiesOfState(birthCountry, birthCounty);
      const city = cities.find(c => c.name === birthCity)?.name || birthCity;

      // Calculate positions
      const result = await calculateAstralPositions('ro', payload);

      // Update parent component state
      setResult(result);
      setUserInfo({
        name: fullName,
        birthDate: birthDate,
        birthHour: birthHour,
        location: `${city}, ${formatStateName(state)}, ${country}`
      });
    } catch (error) {
      console.error('Error calculating positions:', error);
      setErrors(prev => ({ ...prev, calculation: 'Calcularea pozițiilor a eșuat. Încercați din nou.' }));
    } finally {
      setFormState(prev => ({ ...prev, isCalculating: false }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="fullName">Nume complet</label>
        <input
          type="text"
          id="fullName"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          value={formState.fullName}
          onChange={(e) => handleFormChange('fullName', e.target.value)}
          required
        />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="birthDate">Data nașterii</label>
        <Flatpickr
          value={formState.birthDate || ''}
          onChange={(date) => handleFormChange('birthDate', date[0])}
          options={{
            dateFormat: "d/m/Y",
            allowInput: true,
          }}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Selectează data..."
          required
        />
        {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="birthHour">Ora nașterii</label>
        <Flatpickr
          value={formState.birthHour || ''}
          onChange={(date) => handleFormChange('birthHour', date[0])}
          options={{
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true,
            allowInput: true,
            minuteIncrement: 1,
          }}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Selectează ora..."
          required
        />
        {errors.birthHour && <p className="text-red-500 text-sm mt-1">{errors.birthHour}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="birthCountry">Țara nașterii</label>
        <Select
          id="birthCountry"
          options={options.countryOptions}
          value={options.countryOptions.find(option => option.value === formState.birthCountry) || null}
          onChange={handleCountryChange}
          className="react-select-container"
          classNamePrefix="react-select"
          styles={{
            control: (base) => ({
              ...base,
              borderColor: '#d1d5db',
              borderRadius: '0.5rem',
              '&:hover': {
                borderColor: '#d1d5db'
              }
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#fde68a' : 'white',
              color: '#1f2937',
              '&:hover': {
                backgroundColor: '#fde68a'
              }
            })
          }}
          placeholder="Selectează țara..."
          isSearchable
          required
        />
        {errors.birthCountry && <p className="text-red-500 text-sm mt-1">{errors.birthCountry}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="birthCounty">Județ/Regiune</label>
        <Select
          id="birthCounty"
          options={options.stateOptions}
          value={options.stateOptions.find(option => option.value === formState.birthCounty) || null}
          onChange={handleCountyChange}
          className="react-select-container"
          classNamePrefix="react-select"
          styles={{
            control: (base) => ({
              ...base,
              borderColor: '#d1d5db',
              borderRadius: '0.5rem',
              '&:hover': {
                borderColor: '#d1d5db'
              }
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#fde68a' : 'white',
              color: '#1f2937',
              '&:hover': {
                backgroundColor: '#fde68a'
              }
            })
          }}
          placeholder="Selectează județul..."
          isSearchable
          isDisabled={!formState.birthCountry}
          required
        />
        {errors.birthCounty && <p className="text-red-500 text-sm mt-1">{errors.birthCounty}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="birthCity">Orașul nașterii</label>
        <Select
          id="birthCity"
          options={options.cityOptions}
          value={options.cityOptions.find(option => option.value === formState.birthCity) || null}
          onChange={handleCityChange}
          className="react-select-container"
          classNamePrefix="react-select"
          styles={{
            control: (base) => ({
              ...base,
              borderColor: '#d1d5db',
              borderRadius: '0.5rem',
              '&:hover': {
                borderColor: '#d1d5db'
              }
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#fde68a' : 'white',
              color: '#1f2937',
              '&:hover': {
                backgroundColor: '#fde68a'
              }
            })
          }}
          placeholder="Selectează orașul..."
          isSearchable
          isDisabled={!formState.birthCounty}
          required
        />
        {errors.birthCity && <p className="text-red-500 text-sm mt-1">{errors.birthCity}</p>}
      </div>

      {errors.calculation && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg mb-6">
          {errors.calculation}
        </div>
      )}

      <button
        type="button"
        className="w-full py-3 px-6 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out flex items-center justify-center"
        disabled={formState.isCalculating}
        onClick={handleCalculatePositions}
      >
        {formState.isCalculating ? (
          <>
            <svg
              className="animate-spin"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" strokeDasharray="22" strokeDashoffset="0" />
            </svg>
            <span className="ml-2">Se calculează...</span>
          </>
        ) : (
          'Calculează Pozițiile Planetelor'
        )}
      </button>
    </div>
  );
};

export default BirthDataForm;
