import config from "../config";

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

    return data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
