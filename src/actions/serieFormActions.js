import app from "./firebase";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, set, child, push } from "firebase/database";

const db = getDatabase(app);
const auth = getAuth();

export const SET_FIELD = 'SET_FIELD';
export const setField = (field, value) => {
    return {
        type: SET_FIELD,
        field,
        value,
    }
}

export const CLEAR_SERIE_FORM = 'CLEAR_SERIE_FORM';
const clearSerieForm = () => ({
    type: CLEAR_SERIE_FORM
});

export const SAVE_SERIE = 'SAVE_SERIE'
export const saveSerie = serie => {

    const { currentUser }  = auth;
    const postListRef = ref(db,  `users/${currentUser.uid}/series`);
    const newPostRef = push(postListRef);

    return async dispatch => {
        return await set(newPostRef, serie).then(() => {
            dispatch(clearSerieForm());
        })
    }
}


