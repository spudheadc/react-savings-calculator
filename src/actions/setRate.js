import { SET_RATE } from "../constants";

export function setRate(payload) {
    return { type: SET_RATE, payload };
}
