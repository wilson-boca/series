
import { SET_FIELD, CLEAR_SERIE_FORM, SET_WHOLE_SERIE, RESET_FORM } from '../actions';

const INITIAL_STATE = {
    id: null,
    title: '',
    gender: 'Comédia',
    rate: 50,
    img: '',
    description: ''
};

export default function serieFormReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_FIELD:
            const newState = { ...state };
            newState[action.field] = action.value;
            return newState;
        case CLEAR_SERIE_FORM:
        case RESET_FORM:
            return INITIAL_STATE;
        case SET_WHOLE_SERIE:
            return action.serie;
        default:
            return state;
    }
}
