import { FastifyInstance } from "fastify";
import fetch from "node-fetch";

const PHOTO_API_URL = "https://places.googleapis.com/v1";
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export default async function photoRoute(fastify: FastifyInstance) {
  fastify.post(
    "/photo",
    {
      schema: {
        body: {
          type: "object",
          required: ["photoName"],
          properties: {
            photoName: { type: "string" },
            maxHeightPx: { type: "number", nullable: true },
            maxWidthPx: { type: "number", nullable: true },
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
        const { photoName, maxHeightPx, maxWidthPx } = request.body as {
          photoName: string;
          maxHeightPx?: number;
          maxWidthPx?: number;
        };

        // Build the query string parameters
        const params = new URLSearchParams();
        params.append("key", API_KEY);
        if (maxHeightPx) params.append("maxHeightPx", maxHeightPx.toString());
        if (maxWidthPx) params.append("maxWidthPx", maxWidthPx.toString());

        // Construct the photo request URL
        const photoUrl = `${PHOTO_API_URL}/${photoName}/media?${params.toString()}`;

        // Fetch the photo
        const response = await fetch(photoUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error fetching photo: ${errorText}`);
          if (response.status === 400) {
            return reply.status(400).send({
              error:
                "Invalid request. Ensure photoName and parameters are correct.",
            });
          }
          throw new Error(`Error fetching photo: ${response.statusText}`);
        }

        // Handle response type
        const contentType = response.headers.get("Content-Type") || "";
        if (contentType.startsWith("image/")) {
          // If the response is an image, forward the image to the client
          reply.headers({
            "Content-Type": contentType,
          });
          const imageBuffer = await response.buffer();
          return reply.send(imageBuffer);
        } else {
          // If skipHttpRedirect=true, send JSON response with image details
          const photoDetails = await response.json();
          return reply.status(200).send(photoDetails);
        }
      } catch (error) {
        console.error("Error handling photo request:", error);
        return reply.status(500).send({ error: "Failed to fetch photo." });
      }
    }
  );
}
