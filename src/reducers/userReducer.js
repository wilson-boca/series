import { USER_LOGIN_SUCCESS } from '../actions';

export default function userReducer(state = null, action) {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return action;
        default:
            return state;
    }

}
