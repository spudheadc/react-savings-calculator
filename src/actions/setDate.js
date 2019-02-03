import { SET_DATE } from "../constants";

export function setDate(payload) {
    return { type: SET_DATE, payload };
}
