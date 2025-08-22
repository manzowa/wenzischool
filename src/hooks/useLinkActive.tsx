import { useEffect, useState } from "react";
import { isLinkActive } from "@/utils/helpers";

export const useLinkActive = (url: string) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const checkLink = async () => {
        if (url) {
          const result = await isLinkActive(url);
          setIsActive(result);
        }
    };

    checkLink();
  }, [url]);

  return isActive;
};
