import { Restaurant } from "../types/Restaurants";
import { useEffect, useState } from "react";
import { fetchRestaurantDetail } from "../servcies/restaurantsService";
import { useNavigate, useParams } from "react-router-dom";
import { RestaurantInfos } from "../components/RestaurantInfos/RestaurantInfos";
import PhotosGallery from "../components/PhotosGallery/PhotosGallery";

const RestaurantPage: React.FC = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Retrieve `id` from URL parameters

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        if (!id) {
          throw new Error("Invalid placeId");
        }
        const data = await fetchRestaurantDetail(id);
        setRestaurant(data);
      } catch (error) {
        console.error("Error loading restaurant:", error);
        navigate("/error404", { replace: true }); // Redirect to /error404 on failure
      }
    };

    loadRestaurant();
  }, [id, navigate]); // Add dependencies to prevent infinite re-renders

  if (!restaurant) {
    return <p>Loading...</p>; // Render loading state while fetching data
  }

  return (
    <div>
      <div className="w-full bg-sky-50 border border-sky-200 rounded-md shadow-md max-h-[80vh]">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-5/12 bg-zinc-900 rounded-l">
            <PhotosGallery photos={restaurant.photos} />
          </div>
          <div className="sm:w-7/12 overflow-y-scroll">
            <RestaurantInfos restaurant={restaurant} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
