package org.devio.rnhybridandroid;

import com.facebook.react.bridge.ReadableMap;
/**
 * React Native JS Native通信 | 混合开发
 * 为获取最新更新的代码与教程，请关注课程公告：https://coding.imooc.com/class/304.html
 */
public interface IJSBridge {
    void sendMessage(ReadableMap params);
}
