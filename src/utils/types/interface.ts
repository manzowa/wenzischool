// Model d'une ImageType (images)
export interface ImageType {
  id?: number;
  title?: string;
  filename?: string;
  mimetype?: string;
  type?: string;
  ecoleid?: number;
  evenementid?: number;
  url?: string;
}
// Model AddressType (adresses)
export interface AddressType {
  id?: number;
  voie: string;
  quartier: string;
  reference: string;
  commune: string;
  district: string;
  ville: string;
  ecoleid: number;
}
// Model SchedulesType (horaires)
export interface SchedulesType {
  id?: number;
  jour?: string;
  debut?: string;
  fin?: string;
  ecoleid?: number;
}
// Model EventType ( evenements)
export interface EventType {
  id: number;
  titre: string;
  description: string;
  date: string;
  lieu: string;
  images?: ImageType[];
}

// Model de l'école
export interface SchoolType {
  id: number;
  nom: string;
  telephone?: string;
  email?: string;
  site?: string;
  adresses?: AddressType[];
  images?: ImageType[];
  horaires?: SchedulesType[];
  evenements?: EventType[];
  [key: string]: any;
}