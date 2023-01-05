import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"
import LoginScene from "./scenes/LoginScene";
import SeriesScene from "./scenes/SeriesScene";
import SerieDetailScene from "./scenes/SerieDetailScene";
import SeriesFormScene from "./scenes/SeriesFormScene";


const AppNavigator = createStackNavigator({
    "login": {
        screen: LoginScene,
        navigationOptions: {
            title: "Bem Vindo"
        }
    },
    "main": {
        screen: SeriesScene
    },
    "details": {
        screen: SerieDetailScene,
        navigationOptions: ({ navigation }) => {
            const { title } = navigation.state.params.serie;
            return {
                title: title
            }
        }
    },
    "form": {
        screen: SeriesFormScene,
        navigationOptions: ({ navigation }) => {
            title: "Adicionar nova Série"
            if (navigation.state.params && navigation.state.params.serieToEdit) {
                return { title: navigation.state.params.serieToEdit.title }
            }
            return { title: "Adicionar nova Série" }
        }
    },
    }, {
    defaultNavigationOptions: {
        title: "Series",
        headerTintColor: "white",
        headerStyle: {
            backgroundColor: "#6ca2f7",
            borderBottomColor: "C5C5C5",
            borderBottomWidth: 1,
        },
        headerTitleStyle: {
            color: "white",
            fontSize: 30
        },
        // enable globally (here: format on save)
        "editor.formatOnSave": true,
        // enable per-language (here: Prettier as formatter)
        "[javascript]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "prettier.singleQuote": true,
        "prettier.printWidth": 80,
    }
})

const Router = createAppContainer(AppNavigator);

export default Router;