import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const SerieCard = ({ serie, isFirstColumn, onNavigate }) => (
    <TouchableOpacity
        style={[styles.container, isFirstColumn ? styles.firstColumn : styles.lastColumn]}
        onPress={onNavigate}
    >
        <View style={styles.card}>
            {
                serie.img ? <Image
                    source={{ uri: serie.img }}
                    aspectRatio={1}
                    resizeMode='cover'
                    borderRadius={15}
                /> : null
            }
            <View style={styles.cardTitleWrapper}>
                <Text style={styles.cardTitle}>
                    {serie.title}
                </Text>
            </View>
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
        borderRadius: 15
    },
    cardTitleWrapper: {
        backgroundColor: 'black',
        height: 30,
        position: 'absolute',
        bottom: 0,
        opacity: .8,
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 2,
        paddingLeft: 2,
        alignItems: 'center',
        borderRadius: 15,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0

    },
    cardTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    firstColumn: {
        paddingLeft: 10
    },
    lastColumn: {
        paddingRight: 10
    }
});

export default SerieCard;
