import {AppRegistry} from 'react-native';
import App from './App';
import {StackNavigator} from 'react-navigation'
import SwipeableFlatListDemo from './pages/SwipeableFlatListDemo'
import FlatListDemo from './pages/FlatListDemo'
import SectionListDemo from './pages/SectionListDemo'

const AppRoot = StackNavigator({
    App: {
        screen: App,
    },
    FlatListDemo: {
        screen: FlatListDemo,
        navigationOptions: {
            title: 'FlatListDemo'
        }
    },
    SwipeableFlatListDemo: {
        screen: SwipeableFlatListDemo,
        navigationOptions: {
            title: 'SwipeableFlatListDemo'
        }
    },
    SectionListDemo: {
        screen: SectionListDemo,
        navigationOptions: {
            title: 'SectionListDemo'
        }
    }
});

AppRegistry.registerComponent('FasterListDemo', () => AppRoot);
