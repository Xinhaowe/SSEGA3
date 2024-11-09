import React, { useState, useEffect, useRef } from 'react';
import {
  APIProvider,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
  AdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import { MapComponent } from './MapComponent';


function SpecialService() {
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  return (
    <div>
      <APIProvider apiKey="AIzaSyDgicFQQLNsNJsh_Tajqhds2UIwFGdLzNE">
        <MapComponent></MapComponent>
        </APIProvider>
    </div>
  )
}

export default SpecialService

