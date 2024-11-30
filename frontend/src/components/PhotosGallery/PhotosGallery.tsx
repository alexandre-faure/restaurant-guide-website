import { fetchPhotoUrl } from "../../servcies/restaurantsService";
import { Photo } from "../../types/Restaurants";
import { useEffect, useState } from "react";
import { Galleria } from "primereact/galleria";

interface PhotoItem {
  itemImageSrc: string;
  alt: string;
}

type GalleriaResponsiveOptions = {
  breakpoint: string;
  numVisible: number;
};

const PhotosGallery: React.FC<{ photos: Photo[] }> = ({ photos }) => {
  const [photoUrls, setPhotoUrls] = useState<PhotoItem[]>([]);

  useEffect(() => {
    const loadPhotos = async () => {
      if (!photos || photos.length === 0) {
        console.error("No photos provided!");
        return;
      }

      const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
      if (!apiKey) {
        console.error("API Key is missing!");
        return;
      }

      try {
        const photoUris = await Promise.all(
          photos.map(async (photo) => {
            const photoUrl = await fetchPhotoUrl(photo.name, 700, 700);
            return { itemImageSrc: photoUrl, alt: "Photo of the restaurant" };
          })
        );

        setPhotoUrls(photoUris);
      } catch (error) {
        console.error("Error fetching photo URLs:", error);
      }
    };

    loadPhotos();
  }, [photos]);

  const responsiveOptions: GalleriaResponsiveOptions[] = [
    {
      breakpoint: "1045px",
      numVisible: 4,
    },
    {
      breakpoint: "960px",
      numVisible: 3,
    },
    {
      breakpoint: "775px",
      numVisible: 2,
    },
    {
      breakpoint: "710px",
      numVisible: 2,
    },
    {
      breakpoint: "640px",
      numVisible: 5,
    },
    {
      breakpoint: "545px",
      numVisible: 4,
    },
    {
      breakpoint: "460px",
      numVisible: 3,
    },
    {
      breakpoint: "380px",
      numVisible: 2,
    },
  ];

  const itemTemplate = (item: PhotoItem) => {
    return (
      <div
        className="w-full min-h-96 h-full bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${item.itemImageSrc})` }}
      ></div>
    );
  };

  const thumbnailTemplate = (item: PhotoItem) => {
    return (
      <div
        className="w-20 h-20 bg-cover bg-center my-1"
        style={{ backgroundImage: `url(${item.itemImageSrc})` }}
      ></div>
    );
  };

  return (
    <div className="w-full min-h-96">
      <Galleria
        className="h-full block"
        value={photoUrls}
        responsiveOptions={responsiveOptions}
        numVisible={5}
        circular
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        autoPlay
        transitionInterval={4000}
      />
    </div>
  );
};

export default PhotosGallery;
