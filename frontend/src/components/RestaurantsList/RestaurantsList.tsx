import { fetchRestaurants } from "../../servcies/restaurantsService";
import { useEffect, useState } from "react";

const RestaurantsList: React.FC = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    fetchRestaurants({
      latitude: 37.7749,
      longitude: -122.4194,
      radius: 500,
    }).then((data) => {
      setRestaurants(data);
      console.log(data);
    });
  }, []);
  return <p>This is the restaurants list</p>;
};

export default RestaurantsList;
