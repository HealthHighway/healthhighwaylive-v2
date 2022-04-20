import { SELECT_GROUP_SESSION } from "../types"

export const selectGroupSession = (data) => {
    return {
        type : SELECT_GROUP_SESSION, payload : data
    }
}