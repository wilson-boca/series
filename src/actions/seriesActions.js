import app from "./firebase";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, remove} from "firebase/database";
import { Alert } from "react-native";

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
    }
}

export const deleteSerie = serie => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Alert.alert(
                'Deletar', 
                `Deseja realmente deletar ${serie.title} ?`,
                [{
                    text: 'Não',
                    onPress: () => {
                        resolve(false);
                    },
                    style: 'cancel' // IOS
                }, {
                    text: 'Sim',
                    onPress: async () => {
                        const { currentUser } = auth;                        
                        await remove(ref(db, `users/${currentUser.uid}/series/${serie.id}`));
                        resolve(true);
                    }
                }],
                {cancelable: false}
            )
        })
    }
}