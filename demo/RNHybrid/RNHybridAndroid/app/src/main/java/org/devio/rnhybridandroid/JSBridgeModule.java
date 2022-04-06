package org.devio.rnhybridandroid;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

/**
 * React Native JS Native通信 | 混合开发
 * 为获取最新更新的代码与教程，请关注课程公告：https://coding.imooc.com/class/304.html
 */
public class JSBridgeModule extends ReactContextBaseJavaModule {
    public JSBridgeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "JSBridgeModule";
    }

    @ReactMethod
    public void doAdd(Integer num1, Integer num2, Promise promise) {
        promise.resolve(num1 + num2);
    }

    @ReactMethod
    public void sendMessage(ReadableMap params) {
        if (getCurrentActivity() instanceof IJSBridge) {
            IJSBridge bridge = (IJSBridge) getCurrentActivity();
            bridge.sendMessage(params);
        }
    }
}
