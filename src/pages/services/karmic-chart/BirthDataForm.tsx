import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { SelectOption, LocationCoordinates, UserInfo, BirthDataPayload } from '../../../types';

interface BirthDataFormProps {
  onNext: (payload: BirthDataPayload, userInfo: UserInfo) => void;
}

const BirthDataForm: React.FC<BirthDataFormProps> = ({ onNext }) => {
  // Form state
  const [formState, setFormState] = useState({
    fullName: '',
    birthDate: null as Date | null,
    birthHour: null as Date | null,
    birthCountry: '',
    birthCounty: '',
    birthCity: '',
    coordinates: null as LocationCoordinates | null
  });

  // Options state - separate from form state to reduce re-renders
  const [options, setOptions] = useState({
    countryOptions: [] as SelectOption[],
    stateOptions: [] as SelectOption[],
    cityOptions: [] as SelectOption[]
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
        countryOptions: [...defaultOptions, ...countries]
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
    if (!formState.birthCounty) newErrors.birthCounty = 'Județul/Regiunea nașterii este obligatoriu/oare';
    if (!formState.birthCity) newErrors.birthCity = 'Orașul nașterii este obligatoriu';

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateInputs();
    if (!isValid) {
      return;
    }
    
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

      const country = Country.getCountryByCode(birthCountry)?.name || birthCountry;
      const state = State.getStateByCodeAndCountry(birthCounty, birthCountry)?.name || birthCounty;
      const cities = City.getCitiesOfState(birthCountry, birthCounty);
      const city = cities.find(c => c.name === birthCity)?.name || birthCity;

      onNext(
        payload,
        {
          name: fullName,
          birthDate: birthDate,
          birthHour: birthHour,
          location: `${city}, ${formatStateName(state)}, ${country}`
        });
    } catch (error) {
      console.error('Error setting Birth Data Payload:', error);
      setErrors(prev => ({ ...prev, birthDataPayload: 'Nu am putut salva datele introduse. Te rog încearcă din nou.' }));
    }
  };

  const selectStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderColor: 'rgba(255,255,255,0.15)',
      borderRadius: '0.75rem',
      color: 'white',
      minHeight: '48px',
      '&:hover': { borderColor: 'rgba(168,85,247,0.5)' },
    }),
    singleValue: (base: any) => ({ ...base, color: '#e9d5ff' }),
    input: (base: any) => ({ ...base, color: '#e9d5ff' }),
    menu: (base: any) => ({ ...base, backgroundColor: '#1e1b4b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem' }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? 'rgba(168,85,247,0.2)' : 'transparent',
      color: state.isFocused ? '#e9d5ff' : '#a78bfa',
      '&:hover': { backgroundColor: 'rgba(168,85,247,0.2)' },
    }),
    placeholder: (base: any) => ({ ...base, color: '#6b7280' }),
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-cosmic-300 text-sm mb-2" htmlFor="fullName">Nume complet</label>
        <input
          type="text"
          id="fullName"
          className="w-full p-3 bg-white/5 border border-white/15 rounded-xl text-cosmic-100 placeholder-cosmic-500 focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500 transition-colors"
          placeholder="Introdu numele tău..."
          value={formState.fullName}
          onChange={(e) => handleFormChange('fullName', e.target.value)}
          required
        />
        {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
      </div>

      <div>
        <label className="block text-cosmic-300 text-sm mb-2" htmlFor="birthDate">Data nașterii</label>
        <Flatpickr
          value={formState.birthDate || ''}
          onChange={(date) => handleFormChange('birthDate', date[0])}
          options={{ dateFormat: "d/m/Y", allowInput: true }}
          className="w-full p-3 bg-white/5 border border-white/15 rounded-xl text-cosmic-100 placeholder-cosmic-500 focus:outline-none focus:border-cosmic-500 transition-colors"
          placeholder="Selectează data..."
          required
        />
        {errors.birthDate && <p className="text-red-400 text-xs mt-1">{errors.birthDate}</p>}
      </div>

      <div>
        <label className="block text-cosmic-300 text-sm mb-2" htmlFor="birthHour">Ora nașterii</label>
        <Flatpickr
          value={formState.birthHour || ''}
          onChange={(date) => handleFormChange('birthHour', date[0])}
          options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", time_24hr: true, allowInput: true, minuteIncrement: 1 }}
          className="w-full p-3 bg-white/5 border border-white/15 rounded-xl text-cosmic-100 placeholder-cosmic-500 focus:outline-none focus:border-cosmic-500 transition-colors"
          placeholder="Selectează ora..."
          required
        />
        {errors.birthHour && <p className="text-red-400 text-xs mt-1">{errors.birthHour}</p>}
      </div>

      <div>
        <label className="block text-cosmic-300 text-sm mb-2" htmlFor="birthCountry">Țara nașterii</label>
        <Select
          id="birthCountry"
          options={options.countryOptions}
          value={options.countryOptions.find(option => option.value === formState.birthCountry) || null}
          onChange={handleCountryChange}
          styles={selectStyles}
          placeholder="Selectează țara..."
          isSearchable
          required
        />
        {errors.birthCountry && <p className="text-red-400 text-xs mt-1">{errors.birthCountry}</p>}
      </div>

      <div>
        <label className="block text-cosmic-300 text-sm mb-2" htmlFor="birthCounty">Județ/Regiune</label>
        <Select
          id="birthCounty"
          options={options.stateOptions}
          value={options.stateOptions.find(option => option.value === formState.birthCounty) || null}
          onChange={handleCountyChange}
          styles={selectStyles}
          placeholder="Selectează județul..."
          isSearchable
          isDisabled={!formState.birthCountry}
          required
        />
        {errors.birthCounty && <p className="text-red-400 text-xs mt-1">{errors.birthCounty}</p>}
      </div>

      <div>
        <label className="block text-cosmic-300 text-sm mb-2" htmlFor="birthCity">Orașul nașterii</label>
        <Select
          id="birthCity"
          options={options.cityOptions}
          value={options.cityOptions.find(option => option.value === formState.birthCity) || null}
          onChange={handleCityChange}
          styles={selectStyles}
          placeholder="Selectează orașul..."
          isSearchable
          isDisabled={!formState.birthCounty}
          required
        />
        {errors.birthCity && <p className="text-red-400 text-xs mt-1">{errors.birthCity}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-3 px-6 bg-gradient-to-r from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 text-white font-semibold rounded-xl shadow-glow-purple transition-all duration-300 cursor-pointer"
      >
        Pasul următor
      </button>
    </form>
  );
};

export default BirthDataForm;
