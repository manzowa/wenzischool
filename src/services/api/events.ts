import api from "../api";
import { safeRequest } from "@/utils/safeRequest";
import { EventType } from "@/utils/types";

export function fetchEvents(datetime: string | null, ville: string | null): Promise<EventType[]> {
  return safeRequest(async () => {
    let url = "/evenements";

    const hasDate = datetime && datetime !== "any";
    const hasVille = ville && ville !== "all";

    if (hasDate || hasVille) {
      url += "/filtre";
      if (hasDate) url += `/${datetime}`;
      if (hasVille) url += `/${ville}`;
    }

    const res = await api.get(url);
    return res.data?.data?.evenements ?? [];
  }, []);
}

export function fetchEvent(id: number | null): Promise<EventType[]> {
  return safeRequest(async () => {
    const res = await api.get(`/evenements/${id}`);
    return res.data?.data?.evenements ?? [];
  }, []);
}
