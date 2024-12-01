import { Restaurant } from "../../types/Restaurants";
import RestaurantPreview from "../RestaurantPreview/RestaurantPreview";

const RestaurantsList: React.FC<{
  restaurants: Restaurant[];
  activeRestaurant: string | null;
  setActiveRestaurant: (id: string | null) => void;
}> = ({ restaurants, activeRestaurant, setActiveRestaurant }) => {
  const activeThisRestaurant = (id: string) => {
    setActiveRestaurant(id);
  };

  const leaveThisRestaurant = () => {
    setActiveRestaurant(null);
  };

  return (
    <div className="flex flex-wrap justify-around items-center gap-4">
      {restaurants.map((restaurant, id_restaurant) => (
        <RestaurantPreview
          key={id_restaurant}
          restaurant={restaurant}
          isActive={activeRestaurant === restaurant.name}
          setActive={() => activeThisRestaurant(restaurant.name)}
          setLeave={leaveThisRestaurant}
        />
      ))}
    </div>
  );
};

export default RestaurantsList;
