import { initializeApp } from "firebase/app";
import { Alert } from "react-native";
import firebase from "./firebase";
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
