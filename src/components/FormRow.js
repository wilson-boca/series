import React from "react";
import { View, StyleSheet } from "react-native";

const FormRow = props => {
    const { children } = props;
    return (        
        <View style={styles.container}>
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        padding: 5,
        backgroundColor: "white",
        marginBottom: 5,
        marginTop: 5
    }
});


export default FormRow;