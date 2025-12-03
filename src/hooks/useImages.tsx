import { useEffect, useState } from "react";
import { SchoolType } from "@/utils/types";
import { fetchImages } from "@/services/api/schools";

export function useImages(id: any = 0) {
  const [images, setImages] = useState<SchoolType['images']>([]);
  const [ImageHasLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getImages() {
      setLoading(true);
      try {
        const data = await fetchImages(id);
        setImages(data); // ✅ now type matches
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [id]);

  return { images, ImageHasLoading };
}
