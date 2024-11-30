import { Restaurant } from "../../types/Restaurants";
import { useEffect, useState } from "react";

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
      className="py-2 px-4
      bg-sky-50 hover:bg-sky-100
    border border-sky-200 rounded-md shadow-md hover:shadow-lg
    cursor-pointer
    hover:scale-[1.05] transition"
    >
      <div>
        <img src={photoUrl} />
      </div>
      <div>
        <h3 className="text-lg font-medium">{restaurant.displayName.text}</h3>
        <p>{restaurant.formattedAddress}</p>
        <p>Rating: {restaurant.rating}</p>
        <p>Price level: {restaurant.priceLevel}</p>
        <p>User rating count: {restaurant.userRatingCount}</p>
        <p>
          Wheelchair accessible entrance:{" "}
          {restaurant.accessibilityOptions.wheelchairAccessibleEntrance
            ? "Yes"
            : "No"}
        </p>
        <p>
          Wheelchair accessible restroom:{" "}
          {restaurant.accessibilityOptions.wheelchairAccessibleRestroom
            ? "Yes"
            : "No"}
        </p>
        <p>
          Wheelchair accessible seating:{" "}
          {restaurant.accessibilityOptions.wheelchairAccessibleSeating
            ? "Yes"
            : "No"}
        </p>
      </div>
    </div>
  );
};

export default RestaurantPreview;
