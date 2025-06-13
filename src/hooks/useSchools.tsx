import { useEffect, useState } from "react";
import { SchoolType, SchoolDataType } from "@/utils";

import { 
    fetchSchools,
    fetchSchoolById,
    fetchSchoolByIdWithImages
} from "@/api";

export const useSchools = (
    nom: string = "", 
    taille: number = 20
) => {
    const [schoolData, setSchoolData] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    const filterByName = (s: SchoolType): boolean => {
        return s.nom
        .toString().toLowerCase()
        .includes(nom.toString().toLocaleLowerCase());
    }
    useEffect(() => {
        fetchSchools().then(d => d.data.schools)
        .then(schools => {
            if (nom !== '') {
                return schools.filter(filterByName);
            } 
            return schools;
        }).then(schools => schools.slice(0, taille))
        .then(setSchoolData);
    }, [nom]);


    return schoolData;
};
export const useSchool = (schoolid: number) => {
    const [schoolData, setSchoolData] = useState<SchoolDataType | null>(null);
    useEffect(() => {
        fetchSchoolById(schoolid)
            .then(d => d)
            .then(data => setSchoolData(data));
    }, [schoolid]);
    return schoolData;
}
export const useSchoolImages = (schoolid: number) => {
    const [imagesData, setImagesData] = useState<SchoolType['images'] | null>(null);
    useEffect(() => {
       fetchSchoolByIdWithImages(schoolid)
            .then(d => d.data.images)
            .then(data => setImagesData(data));
    }, [schoolid]);
    return imagesData;
}
export const useAlterSchools = (
    nom: string = "",
    taille: number = 20
): { schoolData: SchoolType[]; loading: boolean } => {
    const [schoolData, setSchoolData] = useState<SchoolType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;

        const loadSchools = async () => {
            setLoading(true);
            try {
                const response = await fetchSchools();
                let schools = response.data.schools as SchoolType[];

                if (nom.trim() !== "") {
                    const lowerNom = nom.toLowerCase();
                    schools = schools.filter((s) =>
                        s.nom.toLowerCase().includes(lowerNom)
                    );
                }

                if (isMounted) {
                    setSchoolData(schools.slice(0, taille));
                }
            } catch (error) {
                console.error("Erreur lors du chargement des écoles:", error);
                if (isMounted) setSchoolData([]);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadSchools();

        return () => {
            isMounted = false;
        };
    }, [nom, taille]);

    return { schoolData, loading };
};