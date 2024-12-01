import { Restaurant } from "../../types/Restaurants";
import { useEffect, useState } from "react";
import AccessibilityRestaurant from "../AccessibiltyRestaurant/AccessibilityRestaurant";
import CostRestaurant from "../CostRestorant/CostRestaurant";
import RatingRestaurant from "../RatingRestaurant/RatingRestaurant";
import { Link } from "react-router-dom";
import { fetchPhotoUrl } from "../../servcies/restaurantsService";
import styles from "./RestaurantPreview.module.css";

const RestaurantPreview: React.FC<{
  restaurant: Restaurant;
  isActive: boolean;
  setActive: () => void;
  setLeave: () => void;
}> = ({ restaurant, isActive, setActive, setLeave }) => {
  const [photoUrl, setPhotoUrl] = useState<string>("");

  useEffect(() => {
    const loadPhoto = async () => {
      if (restaurant.photos && restaurant.photos.length > 0) {
        const photo = restaurant.photos[0];
        try {
          const photoUri = await fetchPhotoUrl(photo.name, 300, 300);
          setPhotoUrl(photoUri);
        } catch (error) {
          console.error("Error fetching photo URL:", error);
        }
      }
    };

    loadPhoto();
  }, [restaurant]);

  return (
    <Link to={`/restaurant/${restaurant.name.split("/")[1]}`}>
      <div
        className={`flex flex-col
          h-72 w-60
          bg-sky-50
          border border-sky-200 rounded-md shadow-md
          cursor-pointer transition
          ${styles.restaurantPreviewContainer}
          ${isActive ? styles.active : ""}
          `}
        onMouseEnter={setActive}
        onMouseLeave={setLeave}
      >
        <div
          className={`rounded-t-md overflow-hidden  min-h-24 bg-center bg-cover transition ${styles.RestaurantPreviewImage}`}
          style={{ backgroundImage: `url(${photoUrl})` }}
        ></div>
        <div className="py-2 px-4 flex flex-col justify-stretch h-full">
          <div>
            <h3 className="text-lg font-medium">
              {restaurant.displayName.text}
            </h3>
          </div>
          <div className="grow">
            <p className="text-sm italic">{restaurant.formattedAddress}</p>
          </div>
          <div>
            <div>
              {restaurant.accessibilityOptions && (
                <div className="text-left">
                  <AccessibilityRestaurant
                    accessibilityOptions={restaurant.accessibilityOptions}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <div>
                {restaurant.priceLevel && (
                  <CostRestaurant priceLevel={restaurant.priceLevel} />
                )}
              </div>
              <div>
                {restaurant.rating && restaurant.userRatingCount && (
                  <RatingRestaurant
                    rating={restaurant.rating}
                    userRatingCount={restaurant.userRatingCount}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantPreview;
