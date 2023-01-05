import app from "./firebase";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get, onValue} from "firebase/database";

const db = getDatabase(app);
const auth = getAuth();


export const SET_SERIES = 'SET_SERIES';
const setSeries = series => ({
    type: SET_SERIES,
    series,
})

export const WATCHED_SERIES = 'WATCHED_SERIES'
export const watchedSeries = () => {

    const { currentUser } = auth;
    return dispatch => {
        const starCountRef = ref(db, `users/${currentUser.uid}/series`);
        return onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(setSeries(snapshot.val()));
            console.log(data);
        });

        // return await get(child(dbRef, `users/${currentUser.uid}/series`)).then((snapshot) => {
        //     if (snapshot.exists()) {
        //       console.log(snapshot.val());
        //     } else {
        //       console.log("No data available");
        //     }
        //   }).catch((error) => {
        //     console.error(error);
        //   });
    }
}
