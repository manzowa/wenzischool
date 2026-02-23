import { useEffect, useState } from "react";
import { SchoolType } from "@/types";
import { fetchSchools, fetchSchoolsByName } from "@/services/api/schools";

export type useSchoolsByProps = {
  name: string;
  limit?: number;
  offset?: number;
};

export type useSchoolsByResult = {
  schools: SchoolType[];
  loading: boolean;
  error: Error | null;
};


export function useSchoolsBy(name: string, limit: number = 5, offset: number = 1): useSchoolsByResult{
  const [schools, setSchools] = useState<SchoolType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function getSchools() {
      try {
        setLoading(true);
        setError(null);

        let data: SchoolType[] = [];

        if (name.trim()) {
          // Si un nom est fourni → recherche filtrée
          data = await fetchSchoolsByName(name, limit);
        } else {
          // Sinon → fetch général avec offset
          const page: number = offset;
          data = await fetchSchools(page, limit);
        }

        setSchools(data);
      } catch (err) {
        console.error("Erreur lors du chargement des écoles:", err);
        setError(err as Error);
        setSchools([]);
      } finally {
        setLoading(false);
      }
    }

    getSchools();
  }, [name, limit, offset]);

  return { schools, loading, error };
}