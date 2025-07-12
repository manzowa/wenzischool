import { SchoolType } from "@/utils/types";
import { API_URL } from '@env';

type SchoolProp = {
  page: number;
  limit: number;
};

type SchoolImage = SchoolType['images'][number];

export async function fetchSchools({page, limit }: SchoolProp): Promise<SchoolType[]> {
  try {
    const url:string = `${API_URL}/ecoles/page/${page}/${limit}`;
    const response = await fetch(url);
    if (!response.ok) {
      if (__DEV__) {
        console.warn(`HTTP error! Status: ${response.status}`);
      }
      return [];
    }
    const data = await response.json();

    if (!data?.data?.schools) {
      if (__DEV__) {
        console.warn("No schools found in response");
      }
      return [];
    }
    return  data.data.schools as SchoolType[];

  } catch (error: unknown) {
    if (__DEV__) {
      console.error('Error loading schools:', error);
    } else {
      // Ici, tu peux envoyer l'erreur à un service comme Sentry
      // Sentry.captureException(error);
    }
    return [];
  }
};
export async function fetchImages(id: number): Promise<SchoolImage[]> {
  try {
    const school_id: number = id;
    const url: string = `${API_URL}/ecoles/${school_id}/images`;
    const response = await fetch(url);
    if (!response.ok) {
      if (__DEV__) {
        console.warn(`HTTP error! Status: ${response.status}`);
      }
      return [];
    }
    const data = await response.json();

    if (!data?.data?.images) {
      if (__DEV__) {
        console.warn("No Images found in response");
      }
      return [];
    }
    return  data.data.images as SchoolType['images'][];
  } catch (error) {
    if (__DEV__) {
      console.error('Error loading images:', error);
    } else {
      // Ici, tu peux envoyer l'erreur à un service comme Sentry
      // Sentry.captureException(error);
    }
    return []; 
  }
};
export async function fetchSchool(id: number): Promise<SchoolType|null> {
  try {
    const school_id: number = id;
    const url: string = `${API_URL}/ecoles/${school_id}`;
    const response = await fetch(url);
    if (!response.ok) {
      if (__DEV__) {
        console.warn(`HTTP error! Status: ${response.status}`);
      }
      return null;
    }
    const data = await response.json();
    if (!data?.data?.school) {
      if (__DEV__) {
        console.warn("No schools found in response");
      }
      return null;
    }
    return data.data.school as SchoolType;
  } catch (error) {
    if (__DEV__) {
      console.error('Error loading schools:', error);
    } else {
      // Ici, tu peux envoyer l'erreur à un service comme Sentry
      // Sentry.captureException(error);
    }
    return null;
  }
};
type SchoolByNameProp= {
  name: string;
  limit: number;
};
export async function fetchSchoolsByName({name, limit }: SchoolByNameProp): Promise<SchoolType[]> {
  try {
    const url: string = `${API_URL}/ecoles/${name}/${limit}`;
    const response = await fetch(url);
    if (!response.ok) {
      if (__DEV__) {
        console.warn(`HTTP error! Status: ${response.status}`);
      }
      return [];
    }
    const data = await response.json();

    if (!data?.data?.schools) {
      if (__DEV__) {
        console.warn("No schools found in response");
      }
      return [];
    }
    return  data.data.schools as SchoolType[];
  } catch (error) {
    if (__DEV__) {
      console.error('Error loading schools:', error);
    } else {
      // Ici, tu peux envoyer l'erreur à un service comme Sentry
      // Sentry.captureException(error);
    }
    return [];
  }
};