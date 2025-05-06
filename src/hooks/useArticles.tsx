import { useEffect, useState } from "react";
import { Options } from "@/constants";
import { ArticleDataType } from "@/utils";

const getArticles = async () => {
    const feedUrl = `${Options.apiUrl}articles`;
    const reponse = await fetch(feedUrl);
    const data = await reponse.json();

    return data;
};

export const useArticles = (taille: number = 20) => {
    const [articleData, setArticleData] = useState([]);
    useEffect(() => {
        getArticles().then(d => d.data.articles)
        .then(articles => articles.slice(0, taille))
        .then(setArticleData)
        .catch((error) => console.error(error));
    }, []);
    return articleData;
}
const getArticleByID = async (articleid: number) => {
    const reponse = await fetch(`${Options.apiUrl}articles/page/${articleid}`);
    const data = await reponse.json();
    return data;
};

export const useArticlePage = (articleid: number) => {
    const [store, setStore] = useState<ArticleDataType>({
        statusCode: 0,
        success: false,
        messages: [],
        data : {
            rows_returned: 0,
            total_rows: 0,
            total_pages: 0,
            has_next_page: false,
            has_privious_page: false,
            articles: []
        }
    });
    useEffect(() => {
        getArticleByID(articleid)
            .then(data => setStore(data))
            .catch((error) => console.error(error));
    }, [articleid]);
    return store;
}