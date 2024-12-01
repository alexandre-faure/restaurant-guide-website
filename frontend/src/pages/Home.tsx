import { useEffect, useState } from "react";
import RestaurantsGrid from "../components/RestaurantsGrid/RestaurantsGrid";
import Map from "../components/Map/Map";
import { fetchRestaurants } from "../servcies/restaurantsService";
import { Restaurant } from "../types/Restaurants";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [activteRestaurant, setActivteRestaurant] = useState<string | null>(
    null
  );
  const [location, setLocation] = useState({
    latitude: 59.3235,
    longitude: 18.0695,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants({
      ...location,
      radius: 500,
    })
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => {
        navigate("/error500", { state: { error } });
      });
  }, [location]);

  return (
    <div>
      <header>
        <h1 className="text-xl font-bold font-medium">
          Welcome to <span className="font-bold">ScandiBites</span>, the
          Restaurant Guide Website!
        </h1>
        <p className="italic">Explore the best restaurants in your area.</p>
      </header>
      <div className="my-5">
        <h2 className="text-3xl font-bold pb-4">Restaurants nearby</h2>
        <div className="flex flex-col md:flex-row gap-x-5">
          <div
            className="md:w-5/12 h-80 md:h-[80svh] md:sticky md:top-[15svh] sm:min-w-80
          rounded-b-xl md:rounded-r-xl overflow-hidden shadow-lg relative mb-5"
          >
            <Map
              restaurants={restaurants}
              activeRestaurant={activteRestaurant}
              setActiveRestaurant={setActivteRestaurant}
              setLocation={setLocation}
              location={location}
            />
          </div>
          <div className="h-full md:w-7/12 md:h-auto">
            {restaurants.length === 0 && (
              <p className="text-lg font-medium italic text-center">
                No restaurants found, please try another location.
              </p>
            )}{" "}
            <RestaurantsGrid
              restaurants={restaurants}
              activeRestaurant={activteRestaurant}
              setActiveRestaurant={setActivteRestaurant}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
