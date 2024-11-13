import React, { useState,useEffect,useRef } from 'react';
import { ControlPosition,MapControl, Map,AdvancedMarker,Pin, InfoWindow,useMap,useMapsLibrary,useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import WorkerProfileCard from './WorkerProfileCard';
import UserProfileCard from './UserPCard';
import './MapComponent.css';  
import workPositionsData from './workpostion.json';

type WorkerPosition = {
    lat: number;
    lng: number;
    userID: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    skills: string[];
  };
  

export function MapComponent () {
    const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [workPositions, setWorkPositions] = useState<WorkerPosition[]>([]);
    useEffect(() => {
        setWorkPositions(workPositionsData);
    }, []);

    return(<div className="map-container">
        <Map defaultZoom={13} defaultCenter={{ lat: -34.92866, lng: 138.59863 }} mapId={"d7ff29f1fcb73e86"} disableDefaultUI={true}>
            <UserMarker place={selectedPlace}></UserMarker>
            <WorkerMarker postionList={workPositions}></WorkerMarker>
            <AdvancedMarker ref={markerRef} position={null} />
        </Map>
        <MapControl position={ControlPosition.TOP}>
        <div className="autocomplete-control">
          <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
        </div>
        </MapControl>
        <MapHandler place={selectedPlace} marker={marker} />
      </div>);
}

interface UserMarkerProps {
    place: google.maps.places.PlaceResult | null;
}

export function UserMarker ({ place }: UserMarkerProps) {
    const userLocation = place?.geometry?.location ? { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() } : null;
    const [open,setOpen] = useState(false);

    const [markerRef, marker] = useAdvancedMarkerRef();
    return(<div>
        <AdvancedMarker position={userLocation} ref={markerRef} onClick={() => setOpen(true)}>
                <Pin></Pin>
            </AdvancedMarker>
            {open && (
                <InfoWindow position={userLocation} onCloseClick={() => setOpen(false)}>
                    <UserProfileCard/>
                </InfoWindow>
            )}
    </div>);
}



type Worker = {
    lat: number;
    lng: number;
    userID: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    skills: string[];
};

type Props = { postionList: Worker[] };

export function WorkerMarker({ postionList }: Props) {
    const [open, setOpen] = useState<string | null>(null);
    
    return (
        <>
            {postionList.map((position) => (
                <React.Fragment key={position.userID}>
                    <AdvancedMarker
                        position={{ lat: position.lat, lng: position.lng }}
                        onClick={() => setOpen(position.userID)}
                    >
                        <Pin background={'#FFFF00'} glyphColor={'#000'} borderColor={'#000'} />
                    </AdvancedMarker>
                    {open === position.userID && (
                        <InfoWindow position={{ lat: position.lat, lng: position.lng }} onCloseClick={() => setOpen(null)}>
                            <WorkerProfileCard worker={position} />
                        </InfoWindow>
                    )}
                </React.Fragment>
            ))}
        </>
    );
}
interface MapHandlerProps {
    place: google.maps.places.PlaceResult | null;
    marker: google.maps.marker.AdvancedMarkerElement | null;
  }
  
  const MapHandler = ({ place, marker }: MapHandlerProps) => {
    const map = useMap();
  
    useEffect(() => {
      if (!map || !place || !marker) return;
  
      if (place.geometry?.viewport) {
        map.fitBounds(place.geometry?.viewport);
      }
      marker.position = place.geometry?.location;
    }, [map, place, marker]);
  
    return null;
  };
  
  interface PlaceAutocompleteProps {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  }
  
  const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
    const [placeAutocomplete, setPlaceAutocomplete] =
      useState<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const places = useMapsLibrary('places');
  
    useEffect(() => {
      if (!places || !inputRef.current) return;
  
      const options = {
        fields: ['geometry', 'name', 'formatted_address']
      };
  
      setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);
  
    useEffect(() => {
      if (!placeAutocomplete) return;
  
      placeAutocomplete.addListener('place_changed', () => {
        onPlaceSelect(placeAutocomplete.getPlace());
      });
    }, [onPlaceSelect, placeAutocomplete]);
  
    return (
      <div className="autocomplete-container">
        <input ref={inputRef} className="autocomplete-input" placeholder="Enter your address" />
      </div>
    );
  };
