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
export type ArticleType = {
    id: number;
    title: string;
    author: string;
    content: string;
    category?: string;
    imageUrl?: string;
    linkUrl?: string;
    published?: string;
};
export type ArticleDataType = {
  statusCode: number;
  success: boolean;
  messages: any[];
  data: {
    rows_returned: number;
    total_rows: number;
    total_pages: number;
    has_next_page: boolean;
    has_privious_page: boolean;
    articles: ArticleType[];
  }
}
export type SchoolDataType = {
  statusCode: number;
  success: boolean;
  messages: any[];
  data: {
    schools: SchoolType[];
  }
}