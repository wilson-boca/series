import React from "react";
import { StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Line from "../components/Line";
import LongText from "../components/LongText";

class SerieDetailScene extends React.Component {
    render() {
        const serie = this.props.navigation.state.params.serie
        return (
            <ScrollView>
                {
                    serie.img 
                    ? <Image style={styles.image} source={{ uri: serie.img}}/>
                    : null
                }
                <Line label="Título" content={serie.title} />
			    <Line label="Gênero" content={serie.gender} />
				<Line label="Nota" content={serie.rate} />
				<LongText label="Descrição" content={serie.description} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },
    image: {
        aspectRatio: 1,

    },
    text: {
        fontWeight: "bold",
        fontSize: 18
    }
})

export default SerieDetailScene;