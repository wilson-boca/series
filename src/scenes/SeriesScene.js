import React from "react";
import {View, FlatList, StyleSheet, Text} from "react-native";
import series from "../series.json"
import SerieCard from "../components/SerieCard";
import AddSerieCard from "../components/AddSerieCard";

const isEven = (number) => {
    return number % 2 === 0;
}

const SeriesScene = props => (
    <View>
    <FlatList
        numColumns={2}
        data={[...series, { isLast: true}]}
        renderItem={({ item, index}) => (
            item.isLast ? 
            <AddSerieCard 
                isFirstColumn={isEven(index)}
                onNavigate={() => props.navigation.navigate("form")}                
            /> : 
            <SerieCard
                serie={item}
                isFirstColumn={isEven(index)}
                onNavigate={() => props.navigation.navigate("details", { serie: item })}
            />
            
        )}
        keyExtractor={ item => item.id}
        ListHeaderComponent={props => (<View style={{ marginTop: 5}} />)}
        ListFooterComponent={props => (<View style={{ marginBottom: 5}} />)}
    />
    </View>
);

export default SeriesScene;