"use client";

import React, {
  useEffect,
  useRef,
  useMemo,
  MutableRefObject,
  useState,
} from "react";
import { Library, Loader } from "@googlemaps/js-api-loader";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
// import Input from "postcss/lib/input";

const libs: Library[] = ["core", "places", "marker"];

function Gautocomplete({
  setterFunction,
  id,
  placeholder,
  className,
}: {
  setterFunction: (x: string) => void;
  id: string;
  placeholder: string;
  className: string;
}) {
  const [myAutoComplete, setGaoutComplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libs,
  });

  const autoCompleteRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoaded) {
      // Define Saudi Arabia bounds
      const saudiArabiaBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(16.3167, 34.6325), // Southwest corner
        new google.maps.LatLng(32.1543, 55.6667) // Northeast corner
      );

      // set the autocomplete
      const gAutoComplete = new google.maps.places.Autocomplete(
        autoCompleteRef.current as HTMLInputElement,
        {
          bounds: saudiArabiaBounds,
          strictBounds: true,
          fields: ["name", "formatted_address", "geometry"],
          componentRestrictions: {
            country: ["sa"],
          },
        }
      );

      setGaoutComplete(gAutoComplete);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (myAutoComplete) {
      myAutoComplete.addListener("place_changed", () => {
        const place = myAutoComplete.getPlace();

        setterFunction(place.formatted_address as string);
      });
    }
  }, [myAutoComplete]);

  return (
    <>
      {isLoaded ? (
        <div>
          <input
            id={id}
            placeholder={placeholder}
            ref={autoCompleteRef}
            className={className}
          />
        </div>
      ) : (
        <div className="w-10 h-10 border-4 border-x-myco2 border-y-myco2 rounded-full animate-spin border-t-transparent"></div>
      )}
    </>
  );
}

export default Gautocomplete;
