import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { API_BASE_URL } from "../../env";
import i18n from "../../i18n";

const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
        return headers;
    },
});

type BaseQueryResult = {
    error?: FetchBaseQueryError;
    data?: unknown;
    meta?: FetchBaseQueryMeta;
};

const customFetchBase: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const language = i18n.language;
    const urlEnd = typeof args === "string" ? args : args.url;
    const adjustedUrl = urlEnd.includes("?")
        ? `${urlEnd}&locale=${language}`
        : `${urlEnd}?locale=${language}`;
    const adjustedArgs =
        typeof args === "string" ? adjustedUrl : { ...args, url: adjustedUrl };

    const result: BaseQueryResult = await baseQuery(adjustedArgs, api, extraOptions);

    if (result.error) {
        return {
            error: result.error,
        };
    }

    return {
        data: result.data,
        meta: result.meta,
    };
};

export default customFetchBase;
