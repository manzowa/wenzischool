export type SchoolType = {
    id: string;
    nom: string;
    telephone?: string;
    email?: string;
    site?: string;
    ecoleid?: any;
    adresses?: {
      voie: string;
      quartier: string;
      reference: string;
      commune: string;
      district: string;
      ville: string;
      ecoleid: number
    } | [] |any;
    images? : {
      id?: string|number;
      title?: string,
      filename?: string,
      mimetype?: string,
      ecoleid?: string|number;
    } | [] | any;
};

export type SchoolDataType = {
  statusCode: number;
  success: boolean;
  messages: any[];
  data: {
    schools: SchoolType[];
  }
}