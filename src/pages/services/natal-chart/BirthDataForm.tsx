import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { FormErrors, SelectOption, LocationCoordinates, UserInfo, BirthDataPayload } from '../../../types/astralChart';

interface BirthDataFormProps {
  onNext: (payload: BirthDataPayload, userInfo: UserInfo) => void;
}

const BirthDataForm: React.FC<BirthDataFormProps> = ({ onNext }) => {
  const [fullName, setFullName] = useState('');

  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthHour, setBirthHour] = useState<Date | null>(null);
  const [birthCountry, setBirthCountry] = useState('');
  const [birthCounty, setBirthCounty] = useState('');
  const [birthCity, setBirthCity] = useState('');
  const [coordinates, setCoordinates] = useState<LocationCoordinates | null>(null);

  const [countryOptions, setCountryOptions] = useState<SelectOption[]>([{ value: '', label: 'Select ...' }]);
  const [stateOptions, setStateOptions] = useState<SelectOption[]>([{ value: '', label: 'Select ...' }]);
  const [cityOptions, setCityOptions] = useState<SelectOption[]>([{ value: '', label: 'Select ...' }]);

  const [errors, setErrors] = useState<FormErrors>({});
  
  useEffect(() => {
    const countries = Country.getAllCountries().map(country => ({
      value: country.isoCode,
      label: country.name
    }));
    const romania = countries.find(c => c.label === 'Romania');
    if (romania) {
      setBirthCountry(romania.value);
      const romanianStates = State.getStatesOfCountry(romania.value).map(state => ({
        value: state.isoCode,
        label: state.name
      }));
      setStateOptions([{ value: '', label: 'Select ...' }, ...romanianStates]);
      const romanianCities = City.getCitiesOfCountry(romania.value)?.map(city => ({
        value: city.name,
        label: city.name
      })) || [];
      setCityOptions([{ value: '', label: 'Select ...' }, ...romanianCities]);
    }
    setCountryOptions([{ value: '', label: 'Select ...' }, ...countries]);
  }, []);

  useEffect(() => {
    if (birthCountry) {
      const states = State.getStatesOfCountry(birthCountry).map(state => ({
        value: state.isoCode,
        label: state.name.replace(/ County$| Province$| Voivodeship$| District$/, '')
      }));
      setStateOptions([{ value: '', label: 'Select ...' }, ...states]);
      setBirthCounty('');
      setBirthCity('');
      setCityOptions([{ value: '', label: 'Select ...' }]);
    }
  }, [birthCountry]);

  useEffect(() => {
    if (birthCounty) {
      const cities = City.getCitiesOfState(birthCountry, birthCounty).map(city => ({ 
        value: city.name, 
        label: city.name 
      }));
      setCityOptions([{ value: '', label: 'Select ...' }, ...cities]);
      setBirthCity('');
    }
  }, [birthCounty, birthCountry]);

  useEffect(() => {
    if (birthCity) {
      const cityData = City.getCitiesOfState(birthCountry, birthCounty)
        .find(city => city.name === birthCity);
      if (cityData) {
        setCoordinates({ 
          lat: Number(cityData.latitude), 
          lng: Number(cityData.longitude) 
        });
      }
    }
  }, [birthCity, birthCountry, birthCounty]);

  const validateInputs = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!birthDate) newErrors.birthDate = 'Birth Date is required';
    if (!birthHour) newErrors.birthHour = 'Birth Hour is required';
    if (!birthCountry) newErrors.birthCountry = 'Birth Country is required';
    if (!birthCounty) newErrors.birthCounty = 'Birth County is required';
    if (!birthCity) newErrors.birthCity = 'Birth City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs() && coordinates && birthDate && birthHour) {
      const payload: BirthDataPayload = {
        longitude: coordinates.lng,
        latitude: coordinates.lat,
        year: birthDate.getFullYear(),
        month: birthDate.getMonth() + 1,
        day: birthDate.getDate(),
        hour: birthHour.getHours(),
        minute: birthHour.getMinutes()
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
        location: `${city}, ${state}, ${country}`
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="birthDate">Birth Date</label>
        <Flatpickr
          value={birthDate}
          onChange={(date) => setBirthDate(date[0])}
          options={{
            dateFormat: "d/m/Y",
            allowInput: true,
            onClose: (selectedDates) => setBirthDate(selectedDates[0]),
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
          value={birthHour}
          onChange={(date) => setBirthHour(date[0])}
          options={{
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true,
            allowInput: true,
            minuteIncrement: 1,
            onClose: (selectedDates) => setBirthHour(selectedDates[0]),
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
          options={countryOptions}
          value={countryOptions.find(option => option.value === birthCountry)}
          onChange={(option) => option && setBirthCountry(option.value)}
          className="w-full"
          classNamePrefix="select"
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
        />
        {errors.birthCountry && <p className="text-red-500 text-sm mt-1">{errors.birthCountry}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="birthCounty">Birth County</label>
        <Select
          id="birthCounty"
          options={stateOptions}
          value={stateOptions.find(option => option.value === birthCounty)}
          onChange={(option) => option && setBirthCounty(option.value)}
          className="w-full"
          classNamePrefix="select"
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
        />
        {errors.birthCounty && <p className="text-red-500 text-sm mt-1">{errors.birthCounty}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 mb-2" htmlFor="birthCity">Birth City</label>
        <Select
          id="birthCity"
          options={cityOptions}
          value={cityOptions.find(option => option.value === birthCity)}
          onChange={(option) => option && setBirthCity(option.value)}
          className="w-full"
          classNamePrefix="select"
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
        />
        {errors.birthCity && <p className="text-red-500 text-sm mt-1">{errors.birthCity}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-amber-500 text-white py-3 px-6 rounded-lg hover:bg-amber-600 transition-colors"
      >
        Next Step
      </button>
    </form>
  );
};

export default BirthDataForm;
