import { ADD_BLOG_FILTERS, SELECT_BLOG_FILTER } from "../types"

export const addFilters = (data) => {
    return {
        type : ADD_BLOG_FILTERS, payload : data
    }
}

export const selectFilterId = (data) => {
    return {
        type : SELECT_BLOG_FILTER, payload : data
    }
}