import { useEffect, useState } from "react";
import { EventType} from "@/utils/types";
import { fetchEvents} from "@/services/api";

export function useEvents(datetime: string | null = null, ville: string | null = null) {
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getEvents() {
            setLoading(true);
            const data = await fetchEvents(datetime, ville);
            setEvents(data);
            setLoading(false);
        }
        getEvents();
    }, [datetime, ville]);
    return { events, loading };
}