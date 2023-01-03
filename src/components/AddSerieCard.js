import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { EvilIcons } from '@expo/vector-icons';

const AddSerieCard = ({ serie, isFirstColumn, onNavigate }) => (
    <TouchableOpacity 
        style={[styles.container, isFirstColumn ? styles.firstColumn : styles.lastColumn]}
        onPress={onNavigate}
    >
        <View style={styles.card} >
            <EvilIcons name="plus" size={180} color="black" />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        
        padding: 5,
        height: Dimensions.get('window').width / 2,
        width: Dimensions.get('window').width / 2,
    },
    card: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
        
    },
    firstColumn: {
        paddingLeft: 10
    },
    lastColumn: {
        paddingRight: 10
    }
})

export default AddSerieCard;