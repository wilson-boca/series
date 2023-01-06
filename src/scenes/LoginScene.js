import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native';
import FormRow from '../components/FormRow';
import { tryLogin } from '../actions';
import { connect } from 'react-redux';

class LoginScene extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoading: false,
            errorCode: ''
        };
    }

    onChangeValue(field, value) {
        this.setState({
            [field]: value
        });
    }

    goToMain() {
        this.props.navigation.navigate('main');
        // this.props.navigation.replace("main"); // reseta o histórico e não volta mais...
    }

    tryLogin() {
        this.setState({ isLoading: true, message: '' });
        const { email, password } = this.state;
        this.props.tryLogin(email, password)
            .then((user) => {
                this.setState({
                    isLoading: false,
                    errorCode: ''
                });
                if (user) {
                    this.goToMain();
                }
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    errorCode: error.code
                });
            });
    }

    renderButton() {
        if (this.state.isLoading) {
 return <ActivityIndicator/>;
}
        return  <Button title='Login' onPress={() => this.tryLogin()}/>;
    }

    getMessageByErrorCode(errorCode) {
        switch (errorCode) {
            case 'auth/wrong-password':
                return 'Senha Inválida';
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            case '':
                return '';
            default:
                return 'Erro desconhecido';
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
                            placeholder='uder@provider.com'
                            value={this.state.email}
                            onChangeText={value => this.onChangeValue('email', value)}
                            keyboardType='email-address'
                            autoCapitalize='none'
                        />
                    </FormRow>
                    <FormRow>
                        <TextInput
                            style= {styles.input}
                            placeholder='********'
                            value={this.state.password}
                            secureTextEntry
                            onChangeText={value => this.onChangeValue('password', value)}
                        />
                    </FormRow>
                    <View style={styles.buttom}>
                        {this.renderButton()}
                        {this.renderErrorMessage()}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        padding: 5,
        backgroundColor: '#e5e5e5'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    square: {
        borderWidth: 1,
        alignSelf: 'stretch',
        borderRadius: 5,
        borderColor: 'white',
        padding: 10,
        backgroundColor: 'white',
        elevation: 1

    },
    buttom: {
        paddingLeft: 5,
        paddingRight: 5
    }

});

export default connect(null, { tryLogin })(LoginScene);
