import {SafeAreaView, StatusBar, BackHandler, LogBox, Platform} from "react-native";
import React, {useEffect, useRef, Fragment} from 'react';
import {WebView, WebViewMessageEvent} from 'react-native-webview';

const TEST_WITH_PRODUCTION = 'https://orders-app.com/';
const TEST_WITH_LOCAL = 'http://192.168.1.11/php-crud/';
// const TEST_WITH_LOCAL = 'http://192.168.1.8:3000/login';


export default function App() {
  const webViewRef = useRef<any>(null);
  let i = 0;

  const handleMessage = async (e: WebViewMessageEvent) => {
    const msg = JSON.parse(e.nativeEvent.data);
    // if (msg) {
    //   if (msg.id === 'loginToken') {
    //     await fetch(msg.ip + "/mypage/users/token", {
    //       method: 'PUT',
    //       headers: {
    //         Accept: '/',
    //         'Content-Type': 'application/json; charset=UTF-8',
    //         Authorization: 'Baerer ' + msg.message,
    //       },
    //       body: JSON.stringify({
    //         'pushToken': expoPushToken,
    //       })
    //     })
    //   } else if (msg.id === 'BACK_TO_PREV_PAGE') {
    //     Platform.OS === 'ios' && webViewRef.current.goBack();
    //   }
    //
    // }
  }

  const injectedJavascript = `(function() {
      // Debug
      console = new Object();
      console.log = function(log) {
        window.ReactNativeWebView.postMessage(log);
      };
      console.debug = console.log;
      console.info = console.log;
      console.warn = console.log;
      console.error = console.log;
      window.postMessage = function(data) {
        window.ReactNativeWebView.postMessage(data);
      };
    })()`

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    });
  }, [BackHandler]);

  return (
      <Fragment>
        <SafeAreaView style={{backgroundColor: '#000'}}/>
        <StatusBar backgroundColor='black'/>
        <WebView
            source={{uri: TEST_WITH_PRODUCTION}}
            useWebKit={true}
            scalesPageToFit={true}
            javaScriptEnabled={true}
            limit={5242880000}
            ref={webViewRef}
            onMessage={handleMessage}
            injectedJavaScript={injectedJavascript}
            onNavigationStateChange={(event => {
              if (i === 0) {
                LogBox.ignoreAllLogs(true)
                i++;
              }
            })}
        />
      </Fragment>
  );
}
