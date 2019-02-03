import { SET_TRANSACTION_DATE } from "../constants";

export function setTransactionDate(payload) {
    return { type: SET_TRANSACTION_DATE, payload };
}
