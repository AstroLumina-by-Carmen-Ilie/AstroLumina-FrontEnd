import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { LocationCoordinates, BirthDataPayload, AstralPositions, SelectOption } from '../../../types/astralPositions';
import { calculateAstralPositions } from '../utilities/astrologicalCalculations';

interface BirthDataFormProps {
  setResult: React.Dispatch<React.SetStateAction<AstralPositions | null>>;
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
    countryOptions: [{ value: '', label: 'Select ...' }] as SelectOption[],
    stateOptions: [{ value: '', label: 'Select ...' }] as SelectOption[],
    cityOptions: [{ value: '', label: 'Select ...' }] as SelectOption[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatStateName = (stateName: string) => {
    if (!stateName) return '';
    return stateName.replace(/ County$| State$| Municipality$| Province$| Region$| District$| Voivodeship$| Oblast$| Quarter$| Governorate$/, '');
  };

  // Initialize country options once on mount
  useEffect(() => {
    try {
      const countries = Country.getAllCountries().map(country => ({
        value: country.isoCode,
        label: country.name
      }));

      setOptions(prev => ({
        ...prev,
        countryOptions: [{ value: '', label: 'Select ...' }, ...countries]
      }));

      // Set Romania as default - but don't cascade updates yet
      const romania = countries.find(c => c.label === 'Romania');
      if (romania) {
        setFormState(prev => ({
          ...prev,
          birthCountry: romania.value
        }));
      }
    } catch (error) {
      console.error('Error initializing countries:', error);
    }
  }, []);

  // Handle country change - load states
  useEffect(() => {
    if (!formState.birthCountry) return;

    try {
      const states = State.getStatesOfCountry(formState.birthCountry).map(state => ({
        value: state.isoCode,
        label: formatStateName(state.name)
      }));

      setOptions(prev => ({
        ...prev,
        stateOptions: [{ value: '', label: 'Select ...' }, ...states],
        cityOptions: [{ value: '', label: 'Select ...' }]
      }));

      // Reset dependent fields
      setFormState(prev => ({
        ...prev,
        birthCounty: '',
        birthCity: '',
        coordinates: null
      }));
    } catch (error) {
      console.error('Error loading states:', error);
    }
  }, [formState.birthCountry]);

  // Handle county change - load cities
  useEffect(() => {
    if (!formState.birthCounty || !formState.birthCountry) return;

    try {
      const cities = City.getCitiesOfState(formState.birthCountry, formState.birthCounty).map(city => ({
        value: city.name,
        label: city.name
      }));

      setOptions(prev => ({
        ...prev,
        cityOptions: [{ value: '', label: 'Select ...' }, ...cities]
      }));

      // Reset city when county changes
      setFormState(prev => ({
        ...prev,
        birthCity: '',
        coordinates: null
      }));
    } catch (error) {
      console.error('Error loading cities:', error);
    }
  }, [formState.birthCounty, formState.birthCountry]);

  // Handle city change - set coordinates
  useEffect(() => {
    if (!formState.birthCity || !formState.birthCounty || !formState.birthCountry) return;

    try {
      const cityData = City.getCitiesOfState(formState.birthCountry, formState.birthCounty)
        .find(city => city.name === formState.birthCity);

      if (cityData) {
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
  }, [formState.birthCity, formState.birthCounty, formState.birthCountry]);

  // Validate all inputs
  const validateInputs = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formState.birthDate) newErrors.birthDate = 'Birth Date is required';
    if (!formState.birthHour) newErrors.birthHour = 'Birth Hour is required';
    if (!formState.birthCountry) newErrors.birthCountry = 'Birth Country is required';
    if (!formState.birthCounty) newErrors.birthCounty = 'Birth County is required';
    if (!formState.birthCity) newErrors.birthCity = 'Birth City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculatePositions = async () => {
    const isValid = validateInputs();
    if (!isValid) return;

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
      setErrors(prev => ({ ...prev, calculation: 'Failed to calculate positions. Please try again.' }));
    } finally {
      setFormState(prev => ({ ...prev, isCalculating: false }));
    }
  };

  // Simple form field change handler
  const handleFormChange = (field: string, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="fullName">Full Name</label>
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
        <label className="block text-gray-800 mb-2" htmlFor="birthDate">Birth Date</label>
        <Flatpickr
          value={formState.birthDate || ''}
          onChange={(date) => handleFormChange('birthDate', date[0])}
          options={{
            dateFormat: "d/m/Y",
            allowInput: true,
          }}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Select date..."
          required
        />
        {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="birthHour">Birth Hour</label>
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
          placeholder="Select time..."
          required
        />
        {errors.birthHour && <p className="text-red-500 text-sm mt-1">{errors.birthHour}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="birthCountry">Birth Country</label>
        <Select
          id="birthCountry"
          options={options.countryOptions}
          value={options.countryOptions.find(option => option.value === formState.birthCountry) || null}
          onChange={(option) => handleFormChange('birthCountry', option?.value || '')}
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
          placeholder="Select country..."
          isSearchable
          required
        />
        {errors.birthCountry && <p className="text-red-500 text-sm mt-1">{errors.birthCountry}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="birthCounty">Birth County/State</label>
        <Select
          id="birthCounty"
          options={options.stateOptions}
          value={options.stateOptions.find(option => option.value === formState.birthCounty) || null}
          // TODO problema la linia de jos pe iPhone
          onChange={(option) => handleFormChange('birthCounty', option?.value || '')}
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
          placeholder="Select county/state..."
          isSearchable
          isDisabled={!formState.birthCountry}
          required
        />
        {errors.birthCounty && <p className="text-red-500 text-sm mt-1">{errors.birthCounty}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="birthCity">Birth City</label>
        <Select
          id="birthCity"
          options={options.cityOptions}
          value={options.cityOptions.find(option => option.value === formState.birthCity) || null}
          // TODO problema la linia de jos pe iPhone
          onChange={(option) => handleFormChange('birthCity', option?.value || '')}
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
          placeholder="Select city..."
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
        // TODO problema la linia de jos pe iPhone
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
            <span className="ml-2">Calculating...</span>
          </>
        ) : (
          'Calculate Planet Positions'
        )}
      </button>
    </div>
  );
};

export default BirthDataForm;
