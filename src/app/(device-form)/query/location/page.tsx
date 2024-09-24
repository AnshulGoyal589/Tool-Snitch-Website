"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

const Page = () => {
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isNextDisabled, setIsNextDisabled] = useState(true); // State to track if the next button should be enabled

  // Extracting terms from the API response
  const extractTerms = (data) => {
    if (!data || !data.predictions) {
      return [];
    }

    return data.predictions.map((prediction) => ({
      display_name: prediction?.structured_formatting?.main_text || '',
      latitude: prediction?.geometry?.lat || '',
      longitude: prediction?.geometry?.lng || ''
    }));
  };

  // Fetching location suggestions
  const olaSearchLocation = async (query) => {
    if (query.length < 3) {
      setLocationSuggestions([]); // Clear suggestions if input is less than 3 characters
      return;
    }
    try {
      const response = await fetch(
        `https://api.olamaps.io/places/v1/autocomplete?input=${query}&api_key=wK829Ehvq1i7fVyVQTyDJfsHfRNPEfy9n34xh7kH`,
        {
          method: 'GET',
          headers: {
            'accept': 'application/json'
          }
        }
      );
      const data = await response.json();
      const suggestions = extractTerms(data);
      setLocationSuggestions(suggestions); // Set the suggestions in state
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  // Handling input change
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue); // Update input value
    olaSearchLocation(inputValue); // Call the search function on input change
  };

  // Handle location selection
  const handleLocationSelect = (location) => {
    setInputValue(location.display_name); // Update input with selected location
    setLocationSuggestions([]); // Clear suggestions

    // Store location and its coordinates in localStorage
    localStorage.setItem('selectedLocation', location.display_name); 
    localStorage.setItem('selectedLatitude', location.latitude);
    localStorage.setItem('selectedLongitude', location.longitude);

    setIsNextDisabled(false); // Enable the next button
  };

  // Clear local storage and set input value on initial render
  useEffect(() => {
    localStorage.removeItem('selectedLocation'); // Remove location from local storage
    localStorage.removeItem('selectedLatitude'); // Remove latitude from local storage
    localStorage.removeItem('selectedLongitude'); // Remove longitude from local storage
  }, []);

  useEffect(() => {
    // Clear suggestions if input is empty
    if (inputValue === "") {
      setLocationSuggestions([]);
      setIsNextDisabled(true); // Disable the next button if input is empty
    }
  }, [inputValue]);

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="max-w-xl px-4">
        <h1 className="mb-3 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-josefin font-bold text-[#212121]">
          Device Form
        </h1>
        <h1 className="text-center sm:text-xl md:text-2xl font-josefin text-gray-400">
          Let us know where you are located so that we can find relevant stores near you
        </h1>

        <Input
          className='rounded-full my-4 px-8 h-12'
          placeholder='Enter your location'
          value={inputValue} // Bind input value to state
          onChange={handleInputChange} // Capture input change
        />

        {locationSuggestions.length > 0 && (
          <ul className="bg-white border border-gray-300 max-h-36 overflow-auto">
            {locationSuggestions.map((location, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleLocationSelect(location)} // Pass selected location
              >
                {location.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='flex justify-center items-center my-5'>
        <a
          href={isNextDisabled ? "#" : "/shops"}
          className={`flex justify-center items-center h-11 px-14 mb-10 sm:h-14 rounded-3xl 
            ${isNextDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#C6A86B] text-neutral-100"}`}
          onClick={(e) => {
            if (isNextDisabled) e.preventDefault(); // Prevent navigation if disabled
          }}
        >
          Next
        </a>
      </div>
    </div>
  );
};

export default Page;
