import { useEffect, useState } from "react";
import { SchoolType} from "@/utils/types";
import { fetchImages} from "@/services/api";


export function useImages(id :any= 0) {
    const [images, setImages] = useState<SchoolType['images'][]>([]);
    const [ImageHasloading, setLoading] = useState(true);

    useEffect(() => {
        async function getImages() {
            setLoading(true);

            const data = await fetchImages(id);
            setImages(data);
            setLoading(false);
        }
        getImages();
    }, [id]);
    return { images, ImageHasloading };
};
