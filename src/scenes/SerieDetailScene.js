import React from 'react';
import { StyleSheet, Image, Button, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Line from '../components/Line';
import LongText from '../components/LongText';
import { connect } from 'react-redux';
import { deleteSerie } from '../actions';

class SerieDetailScene extends React.Component {
    render() {
        const { serie } = this.props.navigation.state.params;
        const { deleteSerie } = this.props;
        return (
            <ScrollView>
                {
                    serie.img
                    ? <Image style={styles.image} source={{ uri: serie.img }}/>
                    : null
                }
                <Line label='Título' content={serie.title} />
                <Line label='Gênero' content={serie.gender} />
                <Line label='Nota' content={serie.rate} />
                <LongText label='Descrição' content={serie.description} />

                <View style={styles.container}>
                    <View style={styles.button}>
                    <Button
                        title='Editar'
                        onPress={() => {
                        this.props.navigation.replace('form',  { serieToEdit: serie });
                        }}
                    />
                    </View>
                    <View style={styles.button}>
                    <Button
                        title='Deletar'
                        color={'#FF0044'}
                        onPress={ async () => {
                            try {
                                const deleted = await deleteSerie(serie);
                                if (deleted) {
                                    this.props.navigation.goBack();
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                    />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        aspectRatio: 1,

    },
    text: {
        fontWeight: 'bold',
        fontSize: 18
    },
    container: {
        marginTop: 15,
        paddingLeft: 7,
        paddingRight: 7,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      button: {
        width: '49%',
        height: 35,
      }
});

export default connect(null, { deleteSerie })(SerieDetailScene);
