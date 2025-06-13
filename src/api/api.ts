import { Options } from "@/constants";

export const fetchSchools = async () => {
  try {
    const response = await fetch(`${Options.apiUrl}ecoles`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors du chargement des écoles :', error);
    return []; // Plus sûr si votre UI attend un tableau
  }
};
export const fetchSchoolById = async (id: number) => {
  try {
    const response = await fetch(`${Options.apiUrl}ecoles/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors du chargement de l\'école :', error);
    return null;
  }
};
export const fetchSchoolByIdWithImages = async (id: number) => {
  try {
    const response = await fetch(`${Options.apiUrl}ecoles/${id}/images`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors du chargement des images de l\'école :', error);
    return null;
  }
};
export const fetchSchoolByIdWithAddresses = async (id: number) => {
  try {
    const response = await fetch(`${Options.apiUrl}ecoles/${id}/adresses`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors du chargement des adresses de l\'école :', error);
    return null;
  }
};
export const fetchSchoolByPerPage = async (page: number) => {
  try {
    const response = await fetch(`${Options.apiUrl}ecoles/page/${page}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors du chargement des écoles par page :', error);
    return null;
  }
};