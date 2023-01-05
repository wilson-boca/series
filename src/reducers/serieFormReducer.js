
import { SET_FIELD, CLEAR_SERIE_FORM } from "../actions";

const INITIAL_STATE = {
    title: "",
    gender: "policy",
    rate: 0,
    img: "",
    description: ""
}

export default function serieFormReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_FIELD:
            const newState = {...state};
            newState[action.field] = action.value;
            return newState;
        case CLEAR_SERIE_FORM:
            return INITIAL_STATE;
        default:
            return state;
    }
};
