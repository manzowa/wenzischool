import { useEffect, useState } from "react";
import { SchoolType} from "@/utils/types";
import { fetchSchools } from "@/services/api";

export function useSchools(page = 1, limit = 5) {
    const [schools, setSchools] = useState<SchoolType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getSchools() {
            setLoading(true);
            const data = await fetchSchools({ page, limit });
            setSchools(data);
            setLoading(false);
        }
        getSchools();
    }, [page, limit]);
    return { schools, loading };
};