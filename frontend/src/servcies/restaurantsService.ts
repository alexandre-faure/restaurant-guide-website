import config from "../config";
import { Convert } from "../types/Restaurants";

const apiBaseUrl = config.apiBaseUrl;

interface RestaurantQueryParams {
  latitude: number;
  longitude: number;
  radius: number;
  maxResults?: number;
}

export const fetchRestaurants = async (params: RestaurantQueryParams) => {
  const { latitude, longitude, radius, maxResults = 10 } = params;

  const payload = {
    latitude: latitude,
    longitude: longitude,
    radius: radius,
    maxResults: maxResults,
  };

  try {
    const response = await fetch(`${apiBaseUrl}/restaurants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch restaurants: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.places || !Array.isArray(data.places)) {
      throw new Error("Invalid response from server");
    }

    const restaurants = Convert.toRestaurants(JSON.stringify(data.places));

    return restaurants;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
