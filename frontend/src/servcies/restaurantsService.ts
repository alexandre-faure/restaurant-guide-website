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

    if (response.status === 204) {
      return [];
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

export const fetchRestaurantDetail = async (placeId: string) => {
  try {
    const response = await fetch(`${apiBaseUrl}/restaurantDetail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ placeId }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid placeId");
      }
      throw new Error(
        `Failed to fetch restaurant detail: ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data) {
      throw new Error("Invalid response from server");
    }

    const restaurant = Convert.toRestaurant(JSON.stringify(data));
    return restaurant;
  } catch (error) {
    console.error("Error fetching restaurant detail:", error);
    throw error;
  }
};

export const fetchPhotoUrl = async (
  photoName: string,
  maxHeightPx?: number,
  maxWidthPx?: number
) => {
  try {
    const response = await fetch(`${apiBaseUrl}/photo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ photoName, maxHeightPx, maxWidthPx }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid photo request");
      }
      throw new Error(`Failed to fetch photo: ${response.statusText}`);
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType?.startsWith("image/")) {
      const imageBlob = await response.blob();
      return URL.createObjectURL(imageBlob);
    } else {
      const photoDetails = await response.json();
      return photoDetails;
    }
  } catch (error) {
    console.error("Error fetching photo:", error);
    throw error;
  }
};
