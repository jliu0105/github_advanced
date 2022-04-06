import AsyncStorage from '@react-native-community/async-storage';
import langs from '../../res/data/langs';
import keys from '../../res/data/keys';
import {ThemeFlags} from '../../res/styles/ThemeFactory';
import ThemeFactory from '../../res/styles/ThemeFactory';

const THEME_KEY = 'theme_key';
export default class ThemeDao {

    /**
     * @returns {Promise<any> | Promise}
     */
    getTheme() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(THEME_KEY, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {
                    this.save(ThemeFlags.Default);
                    result = ThemeFlags.Default;
                }
                resolve(ThemeFactory.createTheme(result));
            });
        });
    }

    /**
     * @param themeFlag
     */
    save(themeFlag) {
        AsyncStorage.setItem(THEME_KEY, themeFlag, (error => {
        }));
    }
}
