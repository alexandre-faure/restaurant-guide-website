import { FastifyInstance } from "fastify";
import fetch from "node-fetch";

const API_URL = "https://places.googleapis.com/v1/places:searchNearby";
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export default async function restaurantsRoute(fastify: FastifyInstance) {
  fastify.post(
    "/restaurants",
    {
      schema: {
        body: {
          type: "object",
          required: ["latitude", "longitude", "radius"],
          properties: {
            latitude: { type: "number" },
            longitude: { type: "number" },
            radius: { type: "number" },
            maxResults: { type: "number", default: 10 },
          },
        },
      },
    },

    async (request, reply) => {
      if (!API_KEY) {
        throw new Error(
          "GOOGLE_PLACES_API_KEY is required, please provide it in your .env file"
        );
      }

      try {
        // Extract parameters from the request body
        const { latitude, longitude, radius, maxResults } = request.body as {
          latitude: number;
          longitude: number;
          radius: number;
          maxResults: number;
        };

        // Build the POST request payload
        const payload = {
          includedTypes: ["restaurant"],
          maxResultCount: maxResults,
          locationRestriction: {
            circle: {
              center: { latitude, longitude },
              radius,
            },
          },
        };

        // Make the request to the Google Places API
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-FieldMask":
              "places.name,places.displayName,places.location,places.googleMapsUri,places.accessibilityOptions,places.photos,places.formattedAddress,places.regularOpeningHours,places.priceLevel,places.rating,places.userRatingCount,places.websiteUri",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error from Google API: ${errorText}`);
        }

        // Parse the response from Google API
        const data = await response.json();

        // Return the fetched places
        return reply.status(200).send(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        return reply.status(500).send({ error: "Failed to fetch restaurants" });
      }
    }
  );
}
