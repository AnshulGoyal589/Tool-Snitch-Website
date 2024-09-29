"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

const OLA_API_KEY = 'wK829Ehvq1i7fVyVQTyDJfsHfRNPEfy9n34xh7kH';
const STYLE_NAME = 'default-light-standard';
const MAP_WIDTH = 600;
const MAP_HEIGHT = 400;
const MAP_ZOOM = 14;
const MAP_FORMAT = 'png';

interface Location {
  display_name: string;
  place_id: string;
  latitude: number;
  longitude: number;
}

const Page = () => {
  const [locationSuggestions, setLocationSuggestions] = useState<Location[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const olaSearchLocation = async (query: string) => {
    if (query.length < 3) {
      setLocationSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://api.olamaps.io/places/v1/autocomplete?input=${query}&api_key=${OLA_API_KEY}`,
        {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'X-Request-Id': 'search-' + Date.now()
          }
        }
      );
      const data = await response.json();
      let suggestions: Location[];
      if (!data || !data.predictions) {
        suggestions = [];
      } else {
        suggestions = data.predictions.map((prediction: any) => ({
          display_name: prediction?.structured_formatting?.main_text || '',
          place_id: prediction?.place_id || '',
          latitude: prediction?.geometry?.location?.lat || 0,
          longitude: prediction?.geometry?.location?.lng || 0
        }));
      }
      setLocationSuggestions(suggestions);
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    olaSearchLocation(inputValue);
  };

  const handleLocationSelect = (location: Location) => {
    setInputValue(location.display_name);
    setLocationSuggestions([]);
    setSelectedLocation(location);
    setIsNextDisabled(false);

    if (typeof window !== "undefined") {
      localStorage.setItem('selectedLocation', location.display_name);
      localStorage.setItem('selectedLatitude', location.latitude.toString());
      localStorage.setItem('selectedLongitude', location.longitude.toString());
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem('selectedLocation');
      localStorage.removeItem('selectedLatitude');
      localStorage.removeItem('selectedLongitude');
    }
  }, []);

  useEffect(() => {
    if (inputValue === "") {
      setLocationSuggestions([]);
      setIsNextDisabled(true);
      setSelectedLocation(null);
    }
  }, [inputValue]);

  const getMapImageUrl = (location: Location | null) => {
    if (!location) return '';
    return `https://api.olamaps.io/tiles/v1/styles/${STYLE_NAME}/static/${location.longitude},${location.latitude},${MAP_ZOOM}/${MAP_WIDTH}x${MAP_HEIGHT}.${MAP_FORMAT}?api_key=${OLA_API_KEY}`;
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="max-w-xl px-4 w-full">
        <h1 className="mb-3 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-josefin font-bold text-[#212121]">
          Device Form
        </h1>
        <h1 className="text-center sm:text-xl md:text-2xl font-josefin text-gray-400">
          Let us know where you are located so that we can find relevant stores near you
        </h1>

        <Input
          className='rounded-full my-4 px-8 h-12'
          placeholder='Enter your location'
          value={inputValue}
          onChange={handleInputChange}
        />

        {locationSuggestions.length > 0 && (
          <ul className="bg-white border border-gray-300 max-h-36 overflow-auto">
            {locationSuggestions.map((location, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleLocationSelect(location)}
              >
                {location.display_name}
              </li>
            ))}
          </ul>
        )}

        {selectedLocation && (
          <div className="mt-4">
            <img 
              src={getMapImageUrl(selectedLocation)} 
              alt={`Map of ${selectedLocation.display_name}`}
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        )}
      </div>

      <div className='flex justify-center items-center my-5'>
        <a
          href={isNextDisabled ? "#" : "/shops"}
          className={`flex justify-center items-center h-11 px-14 mb-10 sm:h-14 rounded-3xl 
            ${isNextDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#C6A86B] text-neutral-100"}`}
          onClick={(e) => {
            if (isNextDisabled) e.preventDefault();
          }}
        >
          Next
        </a>
      </div>
    </div>
  );
};

export default Page;