import React, { Component,Platform,DeviceEventEmitter, } from "react";
import { Image, View, StatusBar ,AsyncStorage, KeyboardAvoidingView ,ImageBackground,Linking,Text,StyleSheet,AppRegistry} from "react-native";

//import { Container, Button, H3, Text, Header, Title, Content, Body, Left, Right,Item ,Label, Input ,Icon } from "native-base";


import AppIntroSlider from 'react-native-app-intro-slider';


const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

const styles = StyleSheet.create({

  sliderMani:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
  
});

const slides = [
  {
    key: 'somethun1',
    title: 'Welcome to Credenc',
    text: 'Get super fast education loan approval\n without visiting any bank.',
    image: require("../../img/splash/1.png"),
    backgroundColor: '#fff',
    imageStyle:{
      width: 200,
      height: 180
    }
  },
  {
    key: 'somethun2',
    title: 'Get Customized Loan Offers',
    text: 'Fill some basic information and use admission detail or test score to get customized loan offers.',
    image: require("../../img/splash/2.png"),
    backgroundColor: '#fff',
     imageStyle:{
      width: 250,
      height: 190
    }
  },
  {
   key: 'somethun4',
    title: 'Hassle Free Documentation',
    text: 'Just upload documents to apply for the loan and avoid the pain of filling long forms.',
    image: require("../../img/splash/4.png"),
    backgroundColor: '#fff',
     imageStyle:{
      width: 215,
      height: 200
    }
  },
  {
     key: 'somethun3',
    title: 'Track Loan Status',
    text: 'Use loan tracker to get loan application status.',
    image: require("../../img/splash/3.png"),
    backgroundColor: '#fff',
     imageStyle:{
      width: 200,
      height: 190
    }
  }
];




class Intro extends Component {

constructor(props) {
    super(props);


    
  }




 async componentDidMount() {
   
   
   
         const introVisit = await AsyncStorage.getItem('introVisit');
   if(introVisit == 'true')
   {
    // Redirect to Login   
       
   this.props.navigation.navigate('Login');    
       
   }
   else
   {
   
   // SET IntroVisist VAriable
            
     await  AsyncStorage.setItem("introVisit", 'true');        
       
   }
      
 }






_onDone = () => {
    // User finished the introduction. Show "real" app
    this.props.navigation.navigate('Login');
    
  }


	render() {
        		return (
			 <View style={styles.sliderMani}>
                             <AppIntroSlider
        slides={slides}
        onDone={this._onDone}
      />
       </View>
      
		);
	}
}

export default Intro;
