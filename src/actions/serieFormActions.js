import app from './firebase';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, update, push, set } from 'firebase/database';

const db = getDatabase(app);
const auth = getAuth();

export const SET_FIELD = 'SET_FIELD';
export const setField = (field, value) => {
    return {
        type: SET_FIELD,
        field,
        value,
    };
};

export const SET_WHOLE_SERIE = 'SET_WHOLE_SERIE';
export const setWholeSerie = serie => ({
    type: SET_WHOLE_SERIE,
    serie
});

export const RESET_FORM = 'RESET_FORM';
export const resetForm = () => ({
    type: RESET_FORM
});

export const CLEAR_SERIE_FORM = 'CLEAR_SERIE_FORM';
const clearSerieForm = () => ({
    type: CLEAR_SERIE_FORM
});

export const SAVE_SERIE = 'SAVE_SERIE';
export const saveSerie = (serie) => {

    const { currentUser }  = auth;
    if (serie.id) {
        const updates = {};
        updates[`users/${currentUser.uid}/series/${serie.id}`] = serie;
        delete serie.id;
        return async (dispatch) => {
            return await update(ref(db), updates).then(() => {
                dispatch(clearSerieForm());
             });
        };
    }
        const postListRef = ref(db,  `users/${currentUser.uid}/series`);
        const newPostRef = push(postListRef);
        return async (dispatch) => {
            return await set(newPostRef, serie).then(() => {
                dispatch(clearSerieForm());
            });
        };

};


