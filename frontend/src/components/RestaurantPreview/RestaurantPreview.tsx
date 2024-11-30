import { Restaurant } from "../../types/Restaurants";
import { useEffect, useState } from "react";
import AccessibilityRestaurant from "../AccessibiltyRestaurant/AccessibilityRestaurant";
import CostRestaurant from "../CostRestorant/CostRestaurant";
import RatingRestaurant from "../RatingRestaurant/RatingRestaurant";

interface RestaurantPreviewProps {
  restaurant: Restaurant;
}

const RestaurantPreview: React.FC<RestaurantPreviewProps> = ({
  restaurant,
}) => {
  const [photoUrl, setPhotoUrl] = useState<string>("");

  useEffect(() => {
    if (restaurant.photos && restaurant.photos.length > 0) {
      const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
      if (!apiKey) {
        console.error("API Key is missing!");
        return;
      }

      const photo = restaurant.photos[0];
      const photoUri = `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=400&maxWidthPx=400&key=${apiKey}`;
      setPhotoUrl(photoUri);
    }
  }, [restaurant]);

  return (
    <div
      className="flex flex-col
      h-72 w-60
      bg-sky-50 hover:bg-sky-100
    border border-sky-200 rounded-md shadow-md hover:shadow-lg
    cursor-pointer
    hover:scale-[1.05] transition"
    >
      <div
        className="rounded-t-md overflow-hidden  min-h-24 bg-center bg-cover"
        style={{ backgroundImage: `url(${photoUrl})` }}
      ></div>
      <div className="py-2 px-4 flex flex-col justify-stretch h-full">
        <div>
          <h3 className="text-lg font-medium">{restaurant.displayName.text}</h3>
        </div>
        <div className="grow">
          <p className="text-sm italic">{restaurant.formattedAddress}</p>
        </div>
        <div>
          <div>
            <div className="text-left">
              <AccessibilityRestaurant
                accessibilityOptions={restaurant.accessibilityOptions}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <CostRestaurant priceLevel={restaurant.priceLevel} />
            </div>
            <div>
              <RatingRestaurant
                rating={restaurant.rating}
                userRatingCount={restaurant.userRatingCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPreview;
