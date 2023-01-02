import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"
import LoginScene from "./src/scenes/LoginScene";
import SeriesScene from "./src/scenes/SeriesScene";


const AppNavigator = createStackNavigator({
    "login": {
        screen: LoginScene,
        navigationOptions: {
            title: "Bem Vindo"
        }
    },
    "main": {
        screen: SeriesScene
    }
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

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;