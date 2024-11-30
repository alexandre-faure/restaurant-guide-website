import { FastifyInstance } from "fastify";
import fetch from "node-fetch";

const API_URL = "https://places.googleapis.com/v1/places/";
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export default async function restaurantDetailRoute(fastify: FastifyInstance) {
  fastify.post(
    "/restaurantDetail",
    {
      schema: {
        body: {
          type: "object",
          required: ["placeId"],
          properties: {
            placeId: { type: "string" },
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
        const { placeId } = request.body as {
          placeId: string;
        };

        const requestUrl = `${API_URL}${placeId}`;

        // Make the request to the Google Places API
        const response = await fetch(requestUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-FieldMask":
              "name,displayName,location,googleMapsUri,accessibilityOptions,photos,formattedAddress,regularOpeningHours,priceLevel,rating,userRatingCount,websiteUri",
          },
        });

        if (!response.ok) {
          if (response.status == 400) {
            return reply.status(400).send({ error: "Invalid placeId" });
          }
          throw new Error(
            `Failed to fetch restaurants: ${response.statusText}`
          );
        }

        // Parse the response from Google API
        const data = await response.json();

        // Return the fetched places
        return reply.status(200).send(data);
      } catch (error) {
        return reply.status(500).send({ error: "Failed to fetch restaurants" });
      }
    }
  );
}
