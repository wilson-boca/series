import React from "react";
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator, Alert } from "react-native";
import FormRow from "../components/FormRow";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default class LoginScene extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "ok@provider.com",
            password: "qwert321",
            logged: false,
            firebase: undefined,
            auth: undefined,
            isLoading: false,
            errorCode: ""
        }
    }

    componentDidMount() {
        const firebaseConfig = {
            apiKey: "AIzaSyDXFAe_e23E8K8CQHFo3SbMV7k2bqQ6yHw",
            authDomain: "series-be2022.firebaseapp.com",
            projectId: "series-be2022",
            storageBucket: "series-be2022.appspot.com",
            messagingSenderId: "92054467150",
            appId: "1:92054467150:web:2354fcc591f409f214091f"
        };
        // Initialize Firebase
        const firebase = initializeApp(firebaseConfig);
        const auth = getAuth();
        this.setState({
            firebase,
            auth
        })
    }

    onChangeValue(field, value){
        this.setState({
            [field] : value
        });
    }

    goToMain() {
        console.log("CHAMOU")
        this.props.navigation.navigate("main");
    }

    tryLogin() {
        
        this.setState({
            isLoading: true
        })
        signInWithEmailAndPassword(this.state.auth, this.state.email, this.state.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.setState({
            logged: true,
            errorCode: ""
          })
          this.goToMain();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          Alert.alert(
            "Usuário não encontrado",
            "Deseja criar um user com os dados inseridos?",
            [
                {
                    text: "Não",
                    style: "cancel"
                },{
                    text: "Sim",
                    onPress: () => {
                        this.setState({
                            errorCode: ""
                        }) 
                        createUserWithEmailAndPassword(this.state.auth, this.state.email, this.state.password)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            this.setState({
                                logged: true
                            })
                            this.goToMain();
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.log(errorMessage);
                            this.setState({
                                errorCode
                              }) 
                        });                        
                    }
                }
            ],
            {
                cancelable: false
            }
          )
          this.setState({
            errorCode
          })          
        })
        .then(() => this.setState({ isLoading: false}));
    }

    renderButton() {
        if (this.state.isLoading)
            return <ActivityIndicator/>
        return  <Button title="Login" onPress={() => this.tryLogin()}/>;
    }

    getMessageByErrorCode(errorCode) {
        switch (errorCode) {
            case "auth/wrong-password":
                return "Senha Inválida"
            case "auth/user-not-found":
                return "Usuário não encontrado"
        }
    }
    
    renderErrorMessage() {
        const { errorCode } = this.state;
            return (
                <View>
                    <Text>{this.getMessageByErrorCode(errorCode)}</Text>
                </View>
            );
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.square}>
                    <FormRow>
                        <TextInput
                            style= {styles.input}
                            placeholder="uder@provider.com"
                            value={this.state.email}
                            onChangeText={value => this.onChangeValue("email", value)}
                        />        
                    </FormRow>
                    <FormRow>
                        <TextInput 
                            style= {styles.input}
                            placeholder="********"
                            value={this.state.password}
                            secureTextEntry
                            onChangeText={value => this.onChangeValue("password", value)}
                        />
                    </FormRow>
                    <View style={styles.buttom}>
                        {this.renderButton()}
                        {this.renderErrorMessage()}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        padding: 5,
        backgroundColor: "#e5e5e5"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
    },
    square: {
        borderWidth: 1,
        alignSelf: "stretch",
        borderRadius: 5,
        borderColor: "white",    
        padding:10,
        backgroundColor: "white",
        elevation: 1

    },
    buttom: {
        paddingLeft: 5,
        paddingRight: 5
    }

})