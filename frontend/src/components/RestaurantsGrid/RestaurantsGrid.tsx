import { fetchRestaurants } from "../../servcies/restaurantsService";
import { useEffect, useState } from "react";
import { Restaurant } from "../../types/Restaurants";
import RestaurantPreview from "../RestaurantPreview/RestaurantPreview";

const RestaurantsList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  useEffect(() => {
    fetchRestaurants({
      latitude: 37.7749,
      longitude: -122.4194,
      radius: 500,
    }).then((data) => {
      setRestaurants(data);
    });
  }, []);

  return (
    <div className="py-4">
      <h2 className="text-xl font-bold pb-4">Restaurants nearby</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {restaurants.map((restaurant, id_restaurant) => (
          <RestaurantPreview key={id_restaurant} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantsList;
