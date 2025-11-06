import { SchoolType, ImageType, EventType } from "@/utils/types";
import { API_URL } from '@env';

type FetchSchoolsProps = {
  page: number;
  limit: number;
};
export async function fetchSchools({ page, limit }: FetchSchoolsProps): Promise<SchoolType[]> 
{
  try {
    const url: string = `${API_URL}/ecoles/page/${page}/${limit}`;
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
    return data.data.schools as SchoolType[];

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
type FetchImageProps = {
  id: number;
};
export async function fetchImages(id: number): Promise<ImageType[]> {
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
    return data.data.images as ImageType[];
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
type FetchSchoolProps = {
  id: number;
};
export async function fetchSchool(id: number): Promise<SchoolType | null> {
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
type FetchSchoolByNameProps = {
  name: string;
  limit: number;
};
export async function fetchSchoolsByName({ name, limit }: FetchSchoolByNameProps): Promise<SchoolType[]> {
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
    return data.data.schools as SchoolType[];
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

/**
 * Fonction pour récupérer des événements depuis l'API
 * 
 * @param {string|null} datetime - La date (ex: '2025-10-24') ou null si non spécifiée
 * @param {string|null} ville - Le nom de la ville (ex: 'Paris') ou null si non spécifiée
 * @returns {Promise<EventType[]>} - Liste des événements (format JSON)
 */
export async function fetchEvents(datetime: string | null, ville: string | null): Promise<EventType[]> 
{
  let url: string = `${API_URL}/evenements`;
  // On considère que datetime et ville sont des strings ou null/undefined
  const hasDate: boolean = !!datetime && datetime !== "any";
  const hasVille: boolean = !!ville && ville !== "all";
  if (hasDate || hasVille) {
    url += "/filtre";
    if (hasDate) url += `/${datetime}`;
    if (hasVille) url += `/${ville}`;
  }
  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (__DEV__) {
        console.warn(`HTTP error! Status: ${response.status}`);
      }
      return [];
    }
    const data = await response.json();

    // Validate response shape
    if (!data?.data?.evenements) {
      if (__DEV__) {
        console.warn("No events found in response");
      }
      return [];
    }
    // Type assertion to SchoolEvent[] since we are certain the response matches this shape
    return data?.data?.evenements as EventType[];
  } catch (error) {
    if (__DEV__) {
      console.error('Error loading events:', error);
    } else {
      // In production, send the error to a logging service
      console.error('Error fetching events:', error);  // Or a better logging strategy
    }
    return [];
  }
};

/**
 * Fonction pour récupérer des événements depuis l'API
 * 
 * @param {number|null} eventid 
 * @returns {Promise<EventType[]>} - Liste des événements (format JSON)
 */
export async function fetchEvent(eventid: number | null): Promise<EventType[]> 
{
  let url: string = `${API_URL}/evenements/${eventid}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (__DEV__) {
        console.warn(`HTTP error! Status: ${response.status}`);
      }
      return [];
    }
    const data = await response.json();

    // Validate response shape
    if (!data?.data?.evenements) {
      if (__DEV__) {
        console.warn("No events found in response");
      }
      return [];
    }
    // Type assertion to SchoolEvent[] since we are certain the response matches this shape
    return data?.data?.evenements as EventType[];
  } catch (error) {
    if (__DEV__) {
      console.error('Error loading events:', error);
    } else {
      // In production, send the error to a logging service
      console.error('Error fetching events:', error);  // Or a better logging strategy
    }
    return [];
  }
};