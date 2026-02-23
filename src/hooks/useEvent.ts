import { useEffect, useState } from "react";
import { EventType} from "@/types";
import { fetchEvent} from "@/services/api/events";

export function useEvent(eventid: number | null) {
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getEvent() {
            setLoading(true);
            const data = await fetchEvent(eventid);
            setEvents(data);
            setLoading(false);
        }
        getEvent();
    }, [eventid]);
    return { events, loading };
}