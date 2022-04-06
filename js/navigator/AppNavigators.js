import {createAppContainer, createSwitchNavigator} from 'react-navigation';
//@ https://github.com/react-navigation/react-navigation/releases/tag/v4.0.0
import {createStackNavigator} from 'react-navigation-stack';
import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import WebViewPage from '../page/WebViewPage';
import DetailPage from '../page/DetailPage';
import SortKeyPage from '../page/SortKeyPage';
import SearchPage from '../page/SearchPage';
import CustomKeyPage from '../page/CustomKeyPage';
import AboutPage from '../page/about/AboutPage';
import AboutMePage from '../page/about/AboutMePage';
import CodePushPage from '../page/CodePushPage';

export const rootCom = 'Init';

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            headerShown: false,
        },
    },
});
const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            headerShown: false,
        },
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            headerShown: false,
        },
    },
    WebViewPage: {
        screen: WebViewPage,
        navigationOptions: {
            headerShown: false,
        },
    },
    AboutPage: {
        screen: AboutPage,
        navigationOptions: {
            headerShown: false,
        },
    },
    AboutMePage: {
        screen: AboutMePage,
        navigationOptions: {
            headerShown: false,
        },
    },
    CustomKeyPage: {
        screen: CustomKeyPage,
        navigationOptions: {
            headerShown: false,
        },
    },
    SortKeyPage: {
        screen: SortKeyPage,
        navigationOptions: {
            headerShown: false,
        },
    },
    SearchPage: {
        screen: SearchPage,
        navigationOptions: {
            headerShown: false,
        },
    },
    CodePushPage: {
        screen: CodePushPage,
        navigationOptions: {
            headerShown: false,
        },
    },
}, {
    defaultNavigationOptions: {
        headerShown: false,
    },
});
export default createAppContainer(createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
}, {
    navigationOptions: {
        headerShown: false,
    },
}));
