import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import actions from '../action';
import {connect} from 'react-redux';


type Props = {};
const KEY = 'save_key';
export default class AsyncStorageDemoPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            showText: '',
        };
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Use of AsyncStorage</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        this.value = text;
                    }}
                />
                <View style={styles.input_container}>
                    <Text onPress={() => {
                        this.doSave();
                    }}>
                        Save
                    </Text>
                    <Text onPress={() => {
                        this.doRemove();
                    }}>
                        Delete
                    </Text>
                    <Text onPress={() => {
                        this.getData();
                    }}>
                        Fetch
                    </Text>

                </View>

                <Text>
                    {this.state.showText}
                </Text>
            </View>
        );
    }

    /**
     * @returns {Promise.<void>}
     */
    async doSave() {
        AsyncStorage.setItem(KEY, this.value, error => {
            error && console.log(error.toString());
        });
    }

    /**
     * delete data
     * @returns {Promise.<void>}
     */
    async doRemove() {
        AsyncStorage.removeItem(KEY, error => {
            error && console.log(error.toString());
        });
    }
    async getData() {
        AsyncStorage.getItem(KEY, (error, value) => {
            this.setState({
                showText: value,
            });
            console.log(value);
            error && console.log(error.toString());
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        height: 30,
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 10,
    },
    input_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});
