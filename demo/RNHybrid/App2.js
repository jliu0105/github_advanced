/**
 * React Native JS Native通信 | 混合开发
 * 为获取最新更新的代码与教程，请关注课程公告：https://coding.imooc.com/class/304.html
 */

import React, {Component} from 'react';
import CommonPage from './CommonPage';

type Props = {};
export default class App extends Component<Props> {
    render() {
        return <CommonPage name="App2" {...this.props}/>;
    }
}
