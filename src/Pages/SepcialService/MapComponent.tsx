import React, { useState,useEffect,useRef } from 'react';
import { ControlPosition,MapControl, Map,AdvancedMarker,Pin, InfoWindow,useMap,useMapsLibrary,useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import WorkerProfileCard from './WorkerProfileCard';
import UserProfileCard from './UserPCard';
import './MapComponent.css';  // Add this to import the CSS styling

export function MapComponent () {
    const workPositions = [
        { lat: -34.928499, lng: 138.600746, userID: "ewigf", firstName: "Jhone", lastName: "Smith", phoneNumber: "0400000000", skills: ["Plumbing", "Electrical", "Carpentry"] },
        { lat: -34.950000, lng: 138.530000, userID: "asde12", firstName: "Jane", lastName: "Doe", phoneNumber: "0401234567", skills: ["Painting", "Roofing"] },
        { lat: -34.921230, lng: 138.599503, userID: "fgte56", firstName: "Michael", lastName: "Johnson", phoneNumber: "0402345678", skills: ["Landscaping", "Bricklaying"] },
        { lat: -34.930710, lng: 138.684884, userID: "hyu78s", firstName: "Emily", lastName: "Brown", phoneNumber: "0403456789", skills: ["Tiling", "Flooring"] },
        { lat: -34.940000, lng: 138.520000, userID: "ikmno9", firstName: "William", lastName: "Taylor", phoneNumber: "0404567890", skills: ["Welding", "Machinery"] },
        { lat: -34.910000, lng: 138.610098, userID: "qwe23r", firstName: "Olivia", lastName: "Wilson", phoneNumber: "0405678901", skills: ["Plumbing", "Electrical"] },
        { lat: -34.926754, lng: 138.693670, userID: "rtuy34", firstName: "Sophia", lastName: "Martin", phoneNumber: "0406789012", skills: ["Carpentry", "Painting"] },
        { lat: -34.930212, lng: 138.501213, userID: "uiop45", firstName: "James", lastName: "Clark", phoneNumber: "0407890123", skills: ["Roofing", "Bricklaying"] },
        { lat: -34.933698, lng: 138.595937, userID: "mnvb67", firstName: "Mia", lastName: "Lee", phoneNumber: "0408901234", skills: ["Landscaping", "Welding"] },
        { lat: -34.937843, lng: 138.602345, userID: "lkjh89", firstName: "Lucas", lastName: "Walker", phoneNumber: "0409012345", skills: ["Tiling", "Machinery"] },
        { lat: -34.950000, lng: 138.540000, userID: "wer45t", firstName: "Ethan", lastName: "Hall", phoneNumber: "0410123456", skills: ["Flooring", "Bricklaying"] },
        { lat: -34.939654, lng: 138.705478, userID: "zxcd90", firstName: "Amelia", lastName: "Young", phoneNumber: "0411234567", skills: ["Plumbing", "Carpentry"] },
        { lat: -34.944321, lng: 138.498765, userID: "plmn12", firstName: "Charlotte", lastName: "King", phoneNumber: "0412345678", skills: ["Electrical", "Painting"] },
        { lat: -34.935432, lng: 138.497876, userID: "bnvc34", firstName: "Alexander", lastName: "Green", phoneNumber: "0413456789", skills: ["Roofing", "Landscaping"] },
        { lat: -34.929876, lng: 138.690123, userID: "asdf56", firstName: "Isabella", lastName: "Baker", phoneNumber: "0414567890", skills: ["Welding", "Machinery"] },
        { lat: -34.940123, lng: 138.712345, userID: "ghjk78", firstName: "Henry", lastName: "Scott", phoneNumber: "0415678901", skills: ["Tiling", "Flooring"] },
        { lat: -34.943567, lng: 138.501234, userID: "qwsa90", firstName: "Ella", lastName: "Adams", phoneNumber: "0416789012", skills: ["Plumbing", "Electrical"] },
        { lat: -34.941234, lng: 138.706789, userID: "tyui23", firstName: "Benjamin", lastName: "Mitchell", phoneNumber: "0417890123", skills: ["Carpentry", "Bricklaying"] },
        { lat: -34.922345, lng: 138.594567, userID: "oplk45", firstName: "Ava", lastName: "Perez", phoneNumber: "0418901234", skills: ["Painting", "Roofing"] },
        { lat: -34.932456, lng: 138.707890, userID: "hjkl67", firstName: "Jack", lastName: "Carter", phoneNumber: "0419012345", skills: ["Landscaping", "Welding"] },
        { lat: -34.936789, lng: 138.500234, userID: "vbnm89", firstName: "Grace", lastName: "Murphy", phoneNumber: "0420123456", skills: ["Machinery", "Tiling"] },
        { lat: -34.929012, lng: 138.596543, userID: "rtyu12", firstName: "Liam", lastName: "Rodriguez", phoneNumber: "0421234567", skills: ["Flooring", "Bricklaying"] },
        { lat: -34.938765, lng: 138.604321, userID: "asdf34", firstName: "Zoe", lastName: "Lewis", phoneNumber: "0422345678", skills: ["Plumbing", "Carpentry"] },
        { lat: -34.927654, lng: 138.599876, userID: "qwer56", firstName: "Hannah", lastName: "Harris", phoneNumber: "0423456789", skills: ["Electrical", "Painting"] },
        { lat: -34.931234, lng: 138.603456, userID: "tyui78", firstName: "Noah", lastName: "White", phoneNumber: "0424567890", skills: ["Roofing", "Landscaping"] }
    ];
    
    const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
    const [markerRef, marker] = useAdvancedMarkerRef();
    
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
        <input ref={inputRef} className="autocomplete-input" placeholder="Search for a place..." />
      </div>
    );
  };
