import React from "react";
import {View, TextInput, StyleSheet, Text, Button, ScrollView, KeyboardAvoidingView} from "react-native";
import {Picker} from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import FormRow from "../components/FormRow";
import { connect } from "react-redux";
import { setField, saveSerie, setWholeSerie, resetForm } from "../actions";

class SeriesFormScene extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { navigation} = this.props;
        const { params } = navigation.state;
        if (params && params.serieToEdit){
            console.log(params.serieToEdit);
            this.props.setWholeSerie(params.serieToEdit);
        } else{
            this.props.resetForm();
        }
    }

    render() {
        const { serieForm, setField, saveSerie, navigation } = this.props;

        return (
            <KeyboardAvoidingView
            behavior="padding"
            enabled
            keyboardVerticalOffset={150}>
            <ScrollView>
                <FormRow>
                    <TextInput
                        style={styles.input} 
                        placeholder="Título"
                        value={serieForm.title}
                        onChangeText={value => setField("title", value)}
                    />
                </FormRow>
                <FormRow>
                    <TextInput
                        style={styles.input} 
                        placeholder="URL da imagem"
                        value={serieForm.img}
                        onChangeText={value => setField("img", value)}
                    />
                </FormRow>
                <Picker
                    selectedValue={serieForm.gender}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) =>
                        setField('gender', itemValue)
                    }>
                    <Picker.Item label="Policial" value="Policial" />
                    <Picker.Item label="Comédia" value="Comédia" />
                    <Picker.Item label="Drama" value="Drama" />
                    <Picker.Item label="Ficção Científica" value="Ficção Científica" />
                    <Picker.Item label="Romance" value="Romance" />    
                    <Picker.Item label="Ação" value="Ação" />    
                </Picker>
                <FormRow>
                    <View style={styles.grade}>
                        <Text>Nota:</Text>
                        <Text>{serieForm.rate}</Text>
                    </View>
                    <Slider
                        onValueChange={(value) =>
                            setField('rate', value)
                        }
                        style={styles.slide}
                        step={1}
                        value={serieForm.rate}
                        maximumValue={100}
                    />
                </FormRow>
                <FormRow>
                    <TextInput
                        numberOfLines={10}
                        multiline={true}
                        textAlignVertical={'top'}
                        textAlign={'left'}
                        style={styles.description} 
                        placeholder="Descrição"
                        value={serieForm.description}
                        onChangeText={value => setField("description", value)}
                    />
                </FormRow>
                <View style={styles.save}>
                    <Button 
                        title="Salvar"
                        onPress={async () => {
                            try {
                                await saveSerie(serieForm)
                            } catch (error) {
                                console.log(error);
                            } finally {
                                navigation.goBack();
                            }
                        }}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>    
        );
    }
}

const styles = StyleSheet.create({
    input: {
        padding: 5,
        backgroundColor: "#e5e5e5"
    },
    picker: {
        width: '100%'
    },
    slide: {
        width: '100%', 
        height: 30
    },
    grade: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 5,
        paddingRight: 15
    },
    save: {
        padding: 10
    }
});

function mapStateToProps(state) {
    return {
        serieForm: state.serieForm
    }
}

const mapDispatchToProps = {
    setField,
    saveSerie,
    setWholeSerie,
    resetForm
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesFormScene);