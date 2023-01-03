import { initializeApp } from "firebase/app";
import { Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const userLoginSuccess = user => ({
	type: USER_LOGIN_SUCCESS,
	user
});

export const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
	type: USER_LOGOUT,
});


const firebaseConfig = {
    apiKey: "AIzaSyDXFAe_e23E8K8CQHFo3SbMV7k2bqQ6yHw",
    authDomain: "series-be2022.firebaseapp.com",
    projectId: "series-be2022",
    storageBucket: "series-be2022.appspot.com",
    messagingSenderId: "92054467150",
    appId: "1:92054467150:web:2354fcc591f409f214091f"
};
const firebase = initializeApp(firebaseConfig);
const auth = getAuth();

export const tryLogin = (email, password) => dispatch => {
	return signInWithEmailAndPassword(auth, email, password)
		.then(user => {
			const action = userLoginSuccess(user);
			dispatch(action);
            return user;
		})
		.catch(error => {
			if (error.code === 'auth/user-not-found') {
				return new Promise((resolve, reject) => {
					Alert.alert(
						'Usuário não encontrado',
						'Deseja criar um cadastro com as informações inseridas?',
						[{
							text: 'Não',
							onPress: () => resolve(),
							style: 'cancel' // IOS
						}, {
							text: 'Sim',
							onPress: () => {								
                                createUserWithEmailAndPassword(auth, email, password)
                                    .then(resolve)
                                    .catch(reject)
							}
						}],
						{ cancelable: false }
					)
				})
			}
			return Promise.reject(error)
		})
}
