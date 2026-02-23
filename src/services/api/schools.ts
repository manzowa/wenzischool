import apiClient from "@/services/apiClient";
import { safeRequest } from "@/services/api/safeRequest";
import { SchoolType, ImageType } from "@/types";

export function fetchSchools(page: number, limit: number): Promise<SchoolType[]> {
  return safeRequest(async () => {
    const res = await apiClient.get(`/ecoles/page/${page}/${limit}`);
    return res.data?.data?.schools ?? [];
  }, []);
}

export function fetchSchool(id: number): Promise<SchoolType | null> {
  return safeRequest(async () => {
    const res = await apiClient.get(`/ecoles/${id}`);
    return res.data?.data?.school ?? null;
  }, null);
}

export function fetchImages(id: number): Promise<ImageType[]> {
  return safeRequest(async () => {
    const res = await apiClient.get(`/ecoles/${id}/images`);
    return res.data?.data?.images ?? [];
  }, []);
}

export function fetchSchoolsByName(name: string, limit: number): Promise<SchoolType[]> {
  return safeRequest(async () => {
    const res = await apiClient.get(`/ecoles/${name}/${limit}`);
    return res.data?.data?.schools ?? [];
  }, []);
}
