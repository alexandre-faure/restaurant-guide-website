import { useEffect, useState } from "react";
import L from "leaflet";
import { LatLngBoundsExpression } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { Restaurant } from "../../types/Restaurants";
import pinIcon from "../../assets/images/pin.png";
import activePinIcon from "../../assets/images/activePin.png";

const activePin = new L.Icon({
  iconUrl: activePinIcon,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const pin = new L.Icon({
  iconUrl: pinIcon,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const FitBoundsMap: React.FC<{
  restaurants: Restaurant[];
  activeRestaurant: string | null;
  setActiveRestaurant: (id: string) => void;
  setLocation: (location: { latitude: number; longitude: number }) => void;
  location: { latitude: number; longitude: number };
}> = ({
  restaurants,
  activeRestaurant,
  setActiveRestaurant,
  setLocation,
  location,
}) => {
  const [changeLocationActive, setChangeLocationActive] = useState(false);

  const bounds: LatLngBoundsExpression = restaurants.map((restaurant) => [
    restaurant.location.latitude,
    restaurant.location.longitude,
  ]);

  const FitBoundsComponent = () => {
    const map = useMap();

    useEffect(() => {
      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50] });
      } else {
        map.setView([location.latitude, location.longitude], 13);
      }
    }, [bounds, map]);

    return null;
  };

  return (
    <>
      <button
        onClick={() => setChangeLocationActive(!changeLocationActive)}
        className={`absolute text-sm top-0 right-0 z-40 px-2 py-1 rounded-bl ${
          changeLocationActive ? "bg-green-500" : "bg-red-400"
        }`}
      >
        {changeLocationActive
          ? "Click on map to change location"
          : "Position locked"}
      </button>
      <MapContainer
        center={[0, 0]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full z-30"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {restaurants.map((restaurant, index) => (
          <Marker
            key={index}
            position={[
              restaurant.location.latitude,
              restaurant.location.longitude,
            ]}
            eventHandlers={{
              click: () => setActiveRestaurant(restaurant.name),
            }}
            // Change the color of the marker based on the active state
            icon={activeRestaurant === restaurant.name ? activePin : pin}
          >
            <Popup>
              <strong>{restaurant.displayName.text}</strong> <br />
              {restaurant.formattedAddress}
            </Popup>
          </Marker>
        ))}
        <LocationMarker
          setLocation={setLocation}
          changeLocationActive={changeLocationActive}
          setChangeLocationActive={setChangeLocationActive}
        />
        <FitBoundsComponent />
      </MapContainer>
    </>
  );
};

export default FitBoundsMap;

const LocationMarker: React.FC<{
  setLocation: (location: { latitude: number; longitude: number }) => void;
  changeLocationActive: boolean;
  setChangeLocationActive: (active: boolean) => void;
}> = ({ setLocation, changeLocationActive, setChangeLocationActive }) => {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      if (!changeLocationActive) {
        return;
      }
      setLocation({ latitude: lat, longitude: lng });
      setChangeLocationActive(false);
    },
  });

  return null;
};
