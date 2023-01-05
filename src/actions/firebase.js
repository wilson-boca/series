import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDXFAe_e23E8K8CQHFo3SbMV7k2bqQ6yHw",
    authDomain: "series-be2022.firebaseapp.com",
    databaseURL: 'https://series-be2022-default-rtdb.firebaseio.com/',
    projectId: "series-be2022",
    storageBucket: "series-be2022.appspot.com",
    messagingSenderId: "92054467150",
    appId: "1:92054467150:web:2354fcc591f409f214091f"
};

const app = initializeApp(firebaseConfig);

export default app;