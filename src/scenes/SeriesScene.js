import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import SerieCard from '../components/SerieCard';
import AddSerieCard from '../components/AddSerieCard';
import { watchedSeries } from '../actions';

const isEven = (number) => {
    return number % 2 === 0;
};

class SeriesScene extends React.Component {

    componentDidMount() {
        this.props.watchedSeries();
    }

    render() {
        if (this.props.series === null) {
            return <ActivityIndicator />;
        }

        return (
            <View>
            <FlatList
                numColumns={2}
                data={[...this.props.series, { isLast: true }]}
                renderItem={({ item, index }) => (
                    item.isLast
                    ? <AddSerieCard
                        isFirstColumn={isEven(index)}
                        onNavigate={() => this.props.navigation.navigate('form')}
                    />
                    : <SerieCard
                        serie={item}
                        isFirstColumn={isEven(index)}
                        onNavigate={() => this.props.navigation.navigate('details', { serie: item })}
                    />

                )}
                keyExtractor={ item => item.id}
                ListHeaderComponent={() => (<View style={{ marginTop: 5 }} />)}
                ListFooterComponent={() => (<View style={{ marginBottom: 5 }} />)}
            />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { series } = state;

    if (!series) {
        return { series };
    }

    const keys = Object.keys(series);
    const seriesWithKeys = keys.map((key) => {
        return { ...series[key], id: key };
    });
    return { series: seriesWithKeys };
};

export default connect(mapStateToProps, { watchedSeries })(SeriesScene);
