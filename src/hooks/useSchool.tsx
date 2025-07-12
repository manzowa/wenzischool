import { useEffect, useState } from "react";
import { SchoolType} from "@/utils/types";
import { fetchSchool } from "@/services/api";

export function useSchool(id: number = 0) {
    const [school, setSchool] = useState<SchoolType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isCancelled = false;

        async function getSchool() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchSchool(id);
                if (!isCancelled) {
                    setSchool(data);
                }
            } catch (err) {
                if (!isCancelled) {
                    setError(err as Error);
                    setSchool(null);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        }

        getSchool();

        return () => {
            isCancelled = true;
        };
    }, [id]);

    return { school, loading, error };
}