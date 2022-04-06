import React, {Component} from 'react';
import {
    ActivityIndicator,
    RefreshControl,
    StyleSheet,
    SwipeableFlatList,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

type Props = {};
const CITY_NAMES = ['北京', '上海', '广州', '深圳', '杭州', '苏州', '成都', '武汉', '郑州', '洛阳', '厦门', '青岛', '拉萨'];
export default class SwipeableFlatListDemo extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            dataArray: CITY_NAMES,
            isLoading: false
        }
    }

    _renderItem(data) {
        return <View style={styles.item}>
            <Text style={styles.text}>{data.item}</Text>
        </View>
    }

    loadData(refresh) {
        if (refresh) {
            this.setState({
                isLoading: true
            });
        }
        setTimeout(() => {
            let dataArray = [];
            if (refresh) {
                for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                    dataArray.push(this.state.dataArray[i])
                }
            } else {
                dataArray = this.state.dataArray.concat(CITY_NAMES);
            }
            this.setState({
                dataArray: dataArray,
                isLoading: false
            });
        }, 2000);
    }

    genIndicator() {
        return <View style={styles.indicatorContainer}>
            <ActivityIndicator
                style={styles.indicator}
                size='large'
                animating={true}
            />
            <Text>Page loading</Text>
        </View>
    }

    genQuickActions(rowData, sectionID, rowID) {
        return (
            <View style={styles.quickContainer}>
                <TouchableHighlight
                    onPress={() => {
                        alert("confirm delete")
                    }}>
                    <View style={styles.quick}>
                        <Text style={styles.text}>delete</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <SwipeableFlatList
                    ref={swipe=>this.swipe=swipe}
                    data={this.state.dataArray}
                    renderItem={(data => this._renderItem(data))}
                    // refreshing={this.state.isLoading}
                    // onRefresh={() => {
                    //     this.loadData();
                    // }}
                    refreshControl={
                        <RefreshControl
                            title='Loading...'
                            colors={['red']}
                            refreshing={this.state.isLoading}
                            onRefresh={() => this.loadData(true)}
                            tintColor={'orange'}
                        />
                    }
                    ListFooterComponent={() => this.genIndicator()}
                    onEndReached={() => {
                        this.loadData()
                    }}
                    bounceFirstRowOnMount={false}
                    maxSwipeDistance={60}
                    renderQuickActions={() => this.genQuickActions()}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        height: 100,
        backgroundColor: '#169',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    },
    quickContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 15,
        marginBottom: 15,
    },
    quick: {
        backgroundColor: 'red',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 10,
        paddingHorizontal: 10,
        width: 200
    }
});
