import { SET_AMOUNT } from "../constants";

export function setAmount(payload) {
    return { type: SET_AMOUNT, payload };
}
