import React from "react";
import App from "./js/App";

import { StyleSheet, Text, View ,Linking} from 'react-native';
import { Button} from 'native-base';
import OneSignal from 'react-native-onesignal';
import firebase from 'react-native-firebase';

export default class App1 extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

 async componentWillMount() {
//    await Expo.Font.loadAsync({
//      Roboto: require("native-base/Fonts/Roboto.ttf"),
//      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
//      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
//    });



    this.setState({ isReady: true });
    
    OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
       
   firebase.analytics().setAnalyticsCollectionEnabled(true);
            
   firebase.analytics().setCurrentScreen('Home');
   console.log('enable');
        
}

componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
    }

    onIds(device) {
		console.log('Device info: ', device);
    }

  render() {
  //return <App />;
  
            if (this.state.isReady) {
     return <App />;
    }
    return (
      <View >
        
      </View>
    );
    
    
  }
}