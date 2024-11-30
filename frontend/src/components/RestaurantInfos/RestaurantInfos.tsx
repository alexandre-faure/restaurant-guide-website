import React from "react";
import { Restaurant } from "../../types/Restaurants";
import AccessibilityRestaurant from "../AccessibiltyRestaurant/AccessibilityRestaurant";
import CostRestaurant from "../CostRestorant/CostRestaurant";
import RatingRestaurant from "../RatingRestaurant/RatingRestaurant";
import { HiExternalLink } from "react-icons/hi";
import OpeningHoursRestaurant from "../OpeningHoursRestaurant/OpeningHoursRestaurant";
import { GoDotFill } from "react-icons/go";

export const RestaurantInfos: React.FC<{ restaurant: Restaurant }> = ({
  restaurant,
}) => {
  return (
    <div className="m-2 px-3 py-5">
      <div className="mb-5">
        <h3 className="text-3xl font-bold">{restaurant.displayName.text}</h3>
        <p className="text-sm italic">
          {restaurant.formattedAddress} (
          <a
            href={restaurant.googleMapsUri}
            target="_blank"
            className="text-blue-700 hover:underline"
          >
            View on GoogleMaps
          </a>
          )
        </p>
      </div>

      <div className="mb-5">
        <div className="text-sm mb-1">
          <GoDotFill
            className={`inline-block ${
              restaurant.regularOpeningHours.openNow
                ? "text-green-600"
                : "text-red-600"
            }`}
          />
          {"  "}
          {restaurant.regularOpeningHours.openNow ? "Open now" : "Closed"}
        </div>

        <OpeningHoursRestaurant
          periods={restaurant.regularOpeningHours.periods}
        />
      </div>

      <div className="mb-5">
        <HiExternalLink className="inline-block" />
        {"  "}
        <a
          href={restaurant.websiteUri}
          target="_blank"
          className="text-blue-700 hover:underline text-sm"
        >
          {restaurant.websiteUri}
        </a>
      </div>

      <div className="mb-3">
        <AccessibilityRestaurant
          accessibilityOptions={restaurant.accessibilityOptions}
        />
      </div>
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
  );
};
