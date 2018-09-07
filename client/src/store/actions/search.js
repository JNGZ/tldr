import {SEND_SEARCH} from './constants';

export const sendSearch = (text) => {
    console.log("payload is: ", text);
    return {
        type: SEND_SEARCH,
        payload: text
    }
}