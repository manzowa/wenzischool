
import apiClient from "@/services/apiClient";
import { safeRequest } from "@/services/api/safeRequest";
import { EventType } from "@/types";

export function fetchEvents(datetime: string | null, ville: string | null): Promise<EventType[]> {
  return safeRequest(async () => {
    let url = "/evenements";

    const hasDate = datetime && datetime !== "any";
    const hasVille = ville && ville !== "all";

    if (hasDate && hasVille) {
      // Date + ville
      url += `/filtre/datetime/${datetime}/ville/${ville}`;
    } else if (hasDate) {
      // Seulement date
      url += `/filtre/datetime/${datetime}`;
    } else if (hasVille) {
      // Seulement ville
      url += `/filtre/ville/${ville}`;
    }
    // else reste /evenements pour tous les events
    const response = await apiClient.get(url);

    return response.data?.data?.evenements ?? [];
  }, []);
}

export function fetchEvent(id: number | null): Promise<EventType[]> {
  return safeRequest(async () => {
    const res = await apiClient.get(`/evenements/${id}`);
    return res.data?.data?.evenements ?? [];
  }, []);
}
