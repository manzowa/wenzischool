import { useEffect, useState } from "react";
import { SchoolType, SchoolDataType } from "@/utils";
import { Options } from "@/constants";


const getSchools = async () => {
    const feedUrl = `${Options.apiUrl}ecoles`;
    const reponse = await fetch(feedUrl);
    const data = await reponse.json();
    return data;
};
export const useSchools = (nom: string ='', taille: number = 20) => {
    const [schoolData, setSchoolData] = useState([]);
    const filterByName = (s: SchoolType): boolean => {
        return s.nom
        .toString().toLowerCase()
        .includes(nom.toString().toLocaleLowerCase());
    }
    useEffect(() => {
        getSchools().then(d => d.data.schools)
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

const getSchoolBy = async (schoolid: number) => {
    const feedUrl = `${Options.apiUrl}ecoles/${schoolid}`;
    const reponse = await fetch(feedUrl);
    const data = await reponse.json();
    return data;
};

export const useSchool = (schoolid: number) => {
    const [schoolData, setSchoolData] = useState<SchoolDataType | null>(null);
    useEffect(() => {
        getSchoolBy(schoolid)
            .then(d => d)
            .then(data => setSchoolData(data));
    }, [schoolid]);
    return schoolData;
}

const getImagesBySchoolID = async (schoolid: number) => {
    const feedUrl = `${Options.apiUrl}ecoles/${schoolid}/images`;
    const reponse = await fetch(feedUrl);
    const data = await reponse.json();
    return data;
};

export const useSchoolImages = (schoolid: number) => {
    const [imagesData, setImagesData] = useState<SchoolType['images'] | null>(null);
    useEffect(() => {
        getImagesBySchoolID(schoolid)
            .then(d => d.data.images)
            .then(data => setImagesData(data));
    }, [schoolid]);
    return imagesData;
}