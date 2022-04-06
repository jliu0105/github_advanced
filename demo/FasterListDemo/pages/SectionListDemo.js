import React, {Component} from 'react';
import {
    SectionList,
    StyleSheet,
    Text,
    View,
    RefreshControl,
    ActivityIndicator
} from 'react-native';

type Props = {};
const CITY_NAMES = [{data: ['北京', '上海', '广州', '深圳'], title: "一线"}, {
    data: ['杭州', '苏州', '成都', '武汉',],
    title: "二三线1"
}, {data: ['郑州', '洛阳', '厦门', '青岛', '拉萨'], title: "二三线2"}];
export default class SectionListDemo extends Component<Props> {
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

    _renderSectionHeader({section}) {
        debugger
        return <View style={styles.sectionHeader}>
            <Text style={styles.text}>{section.title}</Text>
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

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    sections={this.state.dataArray}
                    renderItem={(data => this._renderItem(data))}
                    renderSectionHeader={(data) => this._renderSectionHeader(data)}
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
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fafafa'
    },
    item: {
        height: 80,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white'
    },
    sectionHeader: {
        height: 50,
        backgroundColor: '#93ebbe',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});
