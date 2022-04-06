package org.devio.rnhybridandroid;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


/**
 * React Native JS Native通信 | 混合开发
 * 为获取最新更新的代码与教程，请关注课程公告：https://coding.imooc.com/class/304.html
 */
public class JSBridgeReactPackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new JSBridgeModule(reactContext));
        return modules;
    }
}
