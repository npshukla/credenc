import React, { Component,Platform,DeviceEventEmitter, } from "react";
import { Image, View, StatusBar ,AsyncStorage, KeyboardAvoidingView ,ImageBackground,Linking,BackHandler,ToastAndroid, Keyboard, TouchableWithoutFeedback, ScrollView,TouchableOpacity,NetInfo} from "react-native";

import { Container, Button, H3, Text, Header, Title, Content, Body, Left, Right,Item ,Label, Separator, Input ,Icon } from "native-base";

//import store from 'react-native-simple-store';

import SmsListener from 'react-native-android-sms-listener';

// CALL LOG TEST
 //import CallLogs from 'react-native-call-log';
// CALL LOG TEST

import styles from "./styles";


const launchscreenLogo = require("../../../img/bitmap.png");
const BannerImage = require("../../../img/banner.png");
const BackgroudbannerImage = require("../../../img/rectangle.png");

const Dimensions = require('Dimensions');

const window = Dimensions.get('window');
   

import { google, facebook } from 'react-native-simple-auth';

import LinkedInModal from 'react-native-linkedin';


import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';


import Modal from "react-native-modal";


// Keyboard dismiss
const DismissKeyboard=({ children })=> (
  <TouchableWithoutFeedback onPress = {()=>Keyboard.dismiss()}>
  {children}
  </TouchableWithoutFeedback>
);


async function getGoogleLogin() {
  console.log('hello');
  google({
  appId: '801281397798-rfahh9d25t84sd6go9lc8fht5cmt20ii.apps.googleusercontent.com',
  callback: 'com.credencapp:/google2redirect',
}).then(async (info) => {
    console.log(info);
    
  // info.user - user details from the provider
  // info.credentials - tokens from the provider
  
 try {
  
 await AsyncStorage.setItem('userLogin', 'true');
      AsyncStorage.setItem('googleToken', info.credentials);
      AsyncStorage.setItem('googleData', JSON.stringify(info.user));
   
 const current_step = await AsyncStorage.gettItem('current_step');
 if (current_step !== null){
    // We have data!!
this.props.navigation.navigate(current_step);
  }
  else
  {
      // first Time Login
  
    await  AsyncStorage.setItem("current_step", 'Loanapplystart'); 
    
    this.props.navigation.navigate('Loanapplystart');
      
  }
  
} catch (error) {
  // Error saving data
  console.log('error');
}   
  
  
  
  
  
}).catch((error) => {
     console.log(error);
  // error.code
  // error.description
});
  

  
}

async function getFacebookLogin() {
console.log('hello fb login');

  facebook({
  appId: '1936634676660792',
  callback: 'fb1936634676660792://authorize',
  scope: 'user_friends', // you can override the default scope here
  fields: ['email', 'first_name', 'last_name'], // you can override the default fields here
}).then(async (info) => {
   // alert(JSON.stringyfy(info));
    
  // info.user - user details from the provider
  // info.credentials - tokens from the provider
  
 try {
  
 await AsyncStorage.setItem('userLogin', 'true');
      AsyncStorage.setItem('facebookToken', info.credentials);
      AsyncStorage.setItem('facebookData', JSON.stringify(info.user));
   
 const current_step = await AsyncStorage.getItem('current_step');
 if (current_step !== null){
    // We have data!!
this.props.navigation.navigate(current_step);
  }
  else
  {
      // first Time Login
  
    await  AsyncStorage.setItem("current_step", 'Loanapplystart'); 
    
    this.props.navigation.navigate('Loanapplystart');
      
  }
  
} catch (error) {
  // Error saving data
  console.log('error');
}   
 
}).catch((error) => {
     console.log(error);
  // error.code
  // error.description
});
  
  
}



class Login extends Component {
	// eslint-disable-line


constructor(props) {
    super(props);

console.debug('startup');

this.state = {
      
      linkedintoken:'AQUjWqolQvnTPeKkzompUC5oGEltB3kvavvHUe2YxfD3J42Crwl0jTcA_lsqT6Locz5uns2g1hId2q8OFVVbj-D10SoskQyLhr1GoZfoLdoRejAE1uXEBxnAqe6j5ZKE94A3P4tifPA3nSsrtxr2dvLbphFYWzP3Ge5rf06wU5DIrVJMg-k',
      applicant_contact_no : null,
      applicant_contact_no_valid:false,
      applicant_full_name:'',
      isModalVisible: false,
      otp_unvalid:false
    };
    
  }
  
 async componentDidMount() {
   
   this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {


                if (this.lastBackButtonPress + 2000 >= new Date().getTime()) {
                    BackHandler.exitApp();
                    return true;
                }
                ToastAndroid.show('Press again to exit :)', ToastAndroid.SHORT);
                this.lastBackButtonPress = new Date().getTime();

                return true;
                
             });     
        
        
        
      Linking.getInitialURL().then( async(url) => {
    if (url) {
    //  alert('Initial url is: ' + url);
      
      if(url.indexOf('google2redirect') !== -1)
      {
         
          // GOOGLE LOGIN
       
//       
//    await  AsyncStorage.setItem('userLogin', 'true');
// //  await   AsyncStorage.setItem('googleToken', access_token);
//   
//   
// const current_step = await  AsyncStorage.getItem('current_step');
// if (current_step !== null){
//    // We have data!!
//this.props.navigation.dispatch(current_step);
//  }
//  else
//  {
//      // first Time Login
//  
// await  AsyncStorage.setItem("current_step", 'Intro'); 
//    
//    this.props.navigation.dispatch('Loanapplystart');
//      
//  }
     
            
      }
      
      
      
      if(url.indexOf('fb1936634676660792') !== -1)
      {
         
          // FACEBOOK LOGIN
 //       access_token_data = url.match(/\#(?:access_token)\=([\S\s]*?)\&/);
        
//      if(access_token_data != null){  
//        access_token = access_token_data[1];
//    await  AsyncStorage.setItem('userLogin', 'true');
//   await   AsyncStorage.setItem('facebookToken', access_token);
//    
//   
// const current_step = await  AsyncStorage.getItem('current_step');
// if (current_step !== null){
//    // We have data!!
//this.props.navigation.dispatch(current_step);
//  }
//  else
//  {
//      // first Time Login
//  
// await  AsyncStorage.setItem("current_step", 'Intro'); 
//    
//    this.props.navigation.dispatch('Loanapplystart');
//      
//  }
//     
//     }
     
     
            
      }
      
      
      
    }
  }).catch(err => console.error('An error occurred', err));


//  AsyncStorage.removeItem('userLogin');
  const userLogin = await AsyncStorage.getItem('userLogin');
   if(userLogin == 'true')
   {
        // current step 
         const current_step = await AsyncStorage.getItem('current_step');
 if (current_step !== null){
    // We have data!!
this.props.navigation.navigate(current_step);
  }
  else
  {
      // first Time Login
 // console.log('hello');
    await  AsyncStorage.setItem("current_step", 'Loanapplystart'); 
    
    this.props.navigation.navigate('Loanapplystart');
      
  }
  
        // current step
   
   }
   else
   {
      console.log('not login');  
   }
   
this._setupGoogleSignin();  

// CALL LOG TEST
//CallLogs.show((logs) =>{
//  // parse logs into json format
//   const parsedLogs = JSON.stringify(logs);
//   
////alert(parsedLogs);
//
// });

// CALL LOG TEST

  }

  
 async componentWillUnmount()  
{
    
 this.backButtonListener.remove();   
    
    
}



googleLogin = async () => 
{
    console.log('google login');
    result = await getGoogleLogin();
   // console.log(result);
    
//    let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
//    headers: { Authorization: `Bearer ${result}`},
//  });
//
//       AsyncStorage.setItem('userLogin', 'true');
//      AsyncStorage.setItem('googleToken', result);
//      AsyncStorage.setItem('googleData', JSON.stringify(userInfoResponse));
//   
//  this.props.navigation.navigate('Home'); 
    
}



async socialMediaDataAuth(atoken , socialData,socialMediaName)
{
  
 var url = global.serverUrl+'/appnew/form/socialmediaauth';
 console.log(url);
 
var loginData = {socialData:socialData,socialMediaName:socialMediaName};
 fetch(url, {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify(loginData)
})
.then( 
(response) => response.text()
) 
.then( async (responseData) => { 
   console.log(responseData); 
   var result =  JSON.parse(responseData);
 console.log(result);
 
  try {
  await AsyncStorage.setItem('userLogin', 'true');
  
   // EXISTING USER
   AsyncStorage.setItem('applicant_contact_no', result['applicant_contact_no']);
  AsyncStorage.setItem('applicant_full_name', result['applicant_full_name']);
   
  
  if(socialMediaName == 'linkedin'){
  AsyncStorage.setItem('linkedinToken', atoken);
      AsyncStorage.setItem('linkedinData', socialData);    
  }
 if(socialMediaName == 'facebook'){
  AsyncStorage.setItem('facebookToken', atoken);
      AsyncStorage.setItem('facebookData', socialData);    
  }
      
   
 const current_step = await AsyncStorage.getItem('current_step');
 if (current_step !== null){
    // We have data!!
this.props.navigation.navigate(current_step);
  }
  else
  {
      // first Time Login
  
 //   await  AsyncStorage.setItem("current_step", 'Intro'); 
    
    this.props.navigation.navigate('Loanapplystart');
      
  }

} catch (error) {
  // Error saving data
  console.log('error');
}    
 
 
 
 
 
   
 })
.catch((err) => { console.log(err); });        
        
        
        
    
    
    
    
}


async getLinkedinLogin(token) {
    console.log(token);
    const atoken = token.access_token;
console.log(atoken);

      const options = 'r_basicprofile,r_emailaddress';
      const profilestr = 'https://api.linkedin.com/v1/people/~';

console.log(profilestr);
     // RNLinkedinLogin.getRequest(profilestr);
     
 fetch(profilestr,{ 
     method: 'GET',
 
 headers: { 
 'Authorization': 'Bearer '+atoken
            }
        }) 
         .then((response) => response)
         .then(async (responseJson) => { 
             console.log(responseJson);
   
   socialData = JSON.stringify(responseJson);
   // SEND DATA TO SERVER
  await this.socialMediaDataAuth(atoken , socialData,'linkedin');
   
   // SEND DATA TO SERVER
  
         
         }) .catch((error) => { 
             
         
             console.error(error);
          });
   
    
    
}





facebookLogin = async () =>
{
  console.log('facebook login');
  token = await getFacebookLogin();
        
  
  
    // Get the user's name using Facebook's Graph API
//    const response = await fetch(
//      `https://graph.facebook.com/me?access_token=${token}`);
//      
//  AsyncStorage.setItem('facebookToken', token);      
//  await   AsyncStorage.setItem('userLogin', 'true');
//   await   AsyncStorage.setItem('facebookData', JSON.stringify(await response.json()));
//    
// console.log('done');
//    
//     this.props.navigation.navigate('Home'); 

    
    
}



 _facebookData = async () => 
{
     var _this = this;
  const { navigate } = _this.props.navigation; 
  FBLoginManager.loginWithPermissions(["email"],  function(error, data){
      console.log("in facebook loging block");
      console.log(data);
  if (!error) {
    console.log("Login data: ", data);
    
    
    atoken = data.credentials.token;
    socialData = data.profile;
    
 socialMediaName = 'facebook';
    
    // NEW CODE
    var url = global.serverUrl+'/appnew/form/socialmediaauth';
 console.log(url);
 
var loginData = {socialData:socialData,socialMediaName:socialMediaName};
 fetch(url, {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify(loginData)
})
.then( 
(response) => response.text()
) 
.then( async (responseData) => { 
   console.log(responseData); 
   var result =  JSON.parse(responseData);
 console.log(result);
 
  try {
  await AsyncStorage.setItem('userLogin', 'true');
  
   // EXISTING USER
   AsyncStorage.setItem('applicant_contact_no', result['applicant_contact_no']);
  AsyncStorage.setItem('applicant_full_name', result['applicant_full_name']);
   
  

  AsyncStorage.setItem('facebookToken', atoken);
      AsyncStorage.setItem('facebookData', socialData);    
 
 const current_step = await AsyncStorage.getItem('current_step');
 if (current_step !== null){
    // We have data!!
navigate(current_step);
  }
  else
  {
      // first Time Login

    
   navigate('Loanapplystart');
      
  }

} catch (error) {
  // Error saving data
  console.log('error');
}    
 
 
 
 
 
   
 })
.catch((err) => { console.log(err); });  
    // NEW CODE
    
    
    
    
    
//   await  AsyncStorage.setItem('userLogin', 'true');
// await AsyncStorage.setItem('facebookToken', access_token);
// await AsyncStorage.setItem('facebookData', dataSave);
// 
// facebookDataArray = JSON.parse(dataSave);
//   
//     applicant_full_name =    await AsyncStorage.getItem('applicant_full_name');
//     
// //applicant_full_name
// if(applicant_full_name == null || applicant_full_name == '' )
// {
//  if(facebookDataArray['name'] != undefined){   
// 
//await AsyncStorage.setItem('applicant_full_name', facebookDataArray['name']); 
//
//  }
//
// }
//  
// const current_step = await  AsyncStorage.getItem('current_step');
// if (current_step !== null){
//   
//navigate(current_step);
//  }
//  else
//  {
//      // first Time Login
//  console.log("HERE2: ");
// //AsyncStorage.setItem("current_step", 'Intro'); 
//    
//    navigate('Loanapplystart');
//      
//  }  
  
  
  
  
  
  
  
    
  } else {
    console.log("Error: ", error);
  }
});
        
  
    
    
}

async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        webClientId: '801281397798-hjs8ucnn7n3dosug7v97skv4o6lvq0sm.apps.googleusercontent.com',
        offlineAccess: false
      });

//      const user = await GoogleSignin.currentUserAsync();
//     alert(JSON.stringify(user));  
//      this.setState({user});
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

 
 _signIn = async () => { 
   
   
var _this = this;
  const { navigate } = _this.props.navigation; 
 
 console.log("in google block");
GoogleSignin.signIn()
    .then( async(user) => {
     
console.log("in google block again");
    access_token = user.idToken;
   // alert("HERE: 0");
//   await  AsyncStorage.setItem('userLogin', 'true');
// await AsyncStorage.setItem('googleToken', access_token);
// await AsyncStorage.setItem('googleData', JSON.stringify(user));
 
 
       atoken = access_token;
    socialData = JSON.stringify(user);
    
 socialMediaName = 'google';
    
    
    // NEW CODE
    var url = global.serverUrl+'/appnew/form/socialmediaauth';
 console.log(url);
 
var loginData = {socialData:socialData,socialMediaName:socialMediaName};
 fetch(url, {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify(loginData)
})
.then( 
(response) => response.text()
) 
.then( async (responseData) => { 
  // console.log(responseData); 
   var result =  JSON.parse(responseData);
 //console.log(result);
 
  try {
  await AsyncStorage.setItem('userLogin', 'true');
  
   // EXISTING USER
   AsyncStorage.setItem('applicant_contact_no', result['applicant_contact_no']);
  AsyncStorage.setItem('applicant_full_name', result['applicant_full_name']);
   
  

  AsyncStorage.setItem('googleToken', atoken);
      AsyncStorage.setItem('googleData', socialData);    

 const current_step = await AsyncStorage.getItem('current_step');
 if (current_step !== null){
    // We have data!!
navigate(current_step);
  }
  else
  {
      // first Time Login

    
   navigate('Loanapplystart');
      
  }

} catch (error) {
  // Error saving data
  console.log('error');
}    
 
   
 })
.catch((err) => { console.log(err); });  
    // NEW CODE    
       
       
       
       
 //      navigate('Loanapplystart');
 

// const current_step = await  AsyncStorage.getItem('current_step');
// if (current_step !== null){
//   
//  navigate(current_step);
//
//  }
//  else
//  {
//
//    navigate('Loanapplystart');
//      
//  } 
   
    })
    .catch((err) => {
      console.log(err);
    });
    
  
  }


async saveData(key,value)
{
 this.setState({ applicant_contact_no_unvalid: false });
 
 
 if(key == 'applicant_contact_no'){
 this.setState({"applicant_contact_no": value}); 

 if (this.state.applicant_contact_no != null && this.state.applicant_contact_no.length==9) {
   Keyboard.dismiss();
 }

 if(this.state.applicant_contact_no != null)
    {
       this.setState({ applicant_contact_no_valid: true }); 
        
    }
    
    } 
    
     if(key == 'otp'){
 this.setState({"otp": value}); 

    } 
   
}

_customerLogin = async () => {


// CHECK FOR INTERNET CONNECTION
NetInfo.getConnectionInfo().then((connectionInfo) => {
  
  if(connectionInfo.type == 'none')
  {
    ToastAndroid.show('No Internet', ToastAndroid.LONG);  
     return false;      
  }
  
});



// CHECK FOR INTERNET CONNECTION

//this._toggleModal();
////this.setState({ otp_unvalid: true });
//
//return false;

if(this.state.applicant_contact_no == null || this.state.applicant_contact_no.length<10)
        {
            
            
            this.setState({ applicant_contact_no_unvalid: true });
            
            return 'failed';
        }        
        
applicant_contact_no = this.state.applicant_contact_no;
//applicant_contact_no = this.state.applicant_contact_no;



console.log(applicant_contact_no);

 var url = global.serverUrl+'/appnew/form/login';
 console.log(url);
 
var loginData = {applicant_contact_no:applicant_contact_no};
 fetch(url, {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify(loginData)
})
.then( 
(response) => response.text()
) 
.then( async (responseData) => { 
   console.log(responseData); 
   var result =  JSON.parse(responseData);
   if(result == 'failed')
   {
       
     console.log('failed');  
   }
   else
   {
     if(result.login)
     {
   
         
         
            

 try {
  

  this._toggleModal();
 
 // OTP FETCH
 
subscription = SmsListener.addListener(message => {
  verificationCodeRegex = /([\d]{4})/g;


  
verificationCode = message.body.match(verificationCodeRegex);
     
if(verificationCode != null)
        {
          
    if(verificationCode[0] != undefined)
    {
      
      this.setState({ otp: verificationCode[0] });  
      
      // wait for 1 sec
      
      // click on button
      this._otpVerify();
      
    }
                       
       subscription.remove();                    
        }
 
});
 
 
 // OTP FETCH
 
} catch (error) {
  // Error saving data
  console.log('error');
}
              
     }
      
   }
   
 })
.catch((err) => { console.log(err); });



//await  AsyncStorage.setItem("applicant_kyc_detail_step", 'complete');

//next_step = await  AsyncStorage.getItem("next_step");
//this.props.navigation.navigate(next_step);
	}
        
        
_otpVerify = async () => {
  
applicant_contact_no = this.state.applicant_contact_no;
otp = this.state.otp;
if(this.state.otp == null || this.state.otp == '')
        {
            
            
            this.setState({ otp_unvalid: true });
            
            return 'failed';
        }     


 var url = global.serverUrl+'/appnew/form/otpverify';
 console.log(url);
 
var loginData = {applicant_contact_no:applicant_contact_no,otp:otp};
 fetch(url, {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify(loginData)
})
.then( 
(response) => response.text()
) 
.then( async (responseData) => { 
    console.log(responseData);
   var result =  JSON.parse(responseData);
   if(result == 'failed')
   {
     this.setState({ otp_unvalid: true });  
     console.log('failed');  
   }
   else
   {
     

 try {
  
  // AFTER LOGIN
  console.log(applicant_contact_no);
//  await AsyncStorage.getAllKeys().then(console.log("hasdjhasjh"));
  await  AsyncStorage.setItem("applicant_contact_no", applicant_contact_no);
  console.log('10');
 await AsyncStorage.setItem('userLogin', 'true');
 
 console.log('1');
 const current_step = await AsyncStorage.getItem('current_step');
 if (current_step !== null){
    // We have data!!
    console.log('2');
this.props.navigation.navigate(current_step);
  }
  else
  {
      // first Time Login
 // console.log('3');
    await  AsyncStorage.setItem("current_step", 'Loanapplystart'); 
    
    this.props.navigation.navigate('Loanapplystart');
      
  }
  
 // console.log('4');
// AFTER LOGIN
  
  
  
} catch (error) {
  // Error saving data
  console.log(error);
  this.setState({ otp_unvalid: true });
  console.log('error');
}
              
    
      
   }
   
 })
.catch((err) => { console.log(err); });


	}        
        
 _otpResend = async () => {
   
applicant_contact_no = this.state.applicant_contact_no;
//applicant_contact_no = this.state.applicant_contact_no;


 var url = global.serverUrl+'/appnew/form/login';
 console.log(url);
 
var loginData = {applicant_contact_no:applicant_contact_no};
 fetch(url, {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify(loginData)
})
.then( 
(response) => response.text()
) 
.then( async (responseData) => { 
   console.log(responseData); 
   var result =  JSON.parse(responseData);
   if(result == 'failed')
   {
       
     console.log('failed');  
   }
   else
   {
     if(result.login)
     {
         

 try {
  

 
 
} catch (error) {
  // Error saving data
  console.log('error');
}
              
     }
      
   }
   
 })
.catch((err) => { console.log(err); });



//await  AsyncStorage.setItem("applicant_kyc_detail_step", 'complete');

//next_step = await  AsyncStorage.getItem("next_step");
//this.props.navigation.navigate(next_step);
	}
    
    
    
    
    
        
        
 _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
 



	render() {
            
        var _this = this;
        
		return (
                        
                        
                        
         <DismissKeyboard>
 
			<Container>
                        
                        
                  
        <Modal isVisible={this.state.isModalVisible}  onBackdropPress={() => this.setState({ isModalVisible: false })}>
          <View style={{ flex: 0,backgroundColor:'#fff'}}>
            <Text style={{textAlign:'center',padding:20, marginTop:20, paddingBottom:10}}>Please enter OTP(One Time Password)</Text>
            
            <View style={{paddingLeft:20, paddingRight:20, marginTop:3}}>
          <Item floatingLabel style={styles.marginInput}>
            <Label style={styles.level,{textAlign:'center', fontSize:13}}>Enter OTP</Label>
           <Input returnKeyType="done" keyboardType="numeric"  ref= {(el) => { this.otp = el; }}
    onChangeText={(otp) => this.saveData('otp', otp)}
    value={this.state.otp} />
    { this.state.otp_unvalid == true   &&
    <Icon name='close-circle' style={{ color: 'red'}} />
    }
          </Item>
          </View>
       <View style={styles.Dirloginbuttonview} >
          <Button rounded block title="Login" style={{backgroundColor:'#f7a700'}} onPress={this._otpVerify}>
                   <Text style={styles.LoginText}>Submit</Text>
            </Button>
                
        </View>     
            <TouchableOpacity onPress={this._otpResend}>
            <View>
                   <Text style={{textAlign:'center', color:'#f7a700', paddingBottom:20, paddingTop:20}}>Resend OTP</Text>         
            </View>
                  
            
            </TouchableOpacity>
            
          </View>
        </Modal>
      
                        
                        
				<StatusBar barStyle="light-content" />
			<ImageBackground source={BannerImage} style={styles.imageContainer} style={{height: window.height/2.4}}>
        <ImageBackground source={BackgroudbannerImage} style={styles.imageContainer}>
					<View style={styles.logoContainer}>
						<Image source={launchscreenLogo} style={styles.logo} />
             <View
   style={{
       borderWidth:0.3,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:window.width-20,
       height:0.3,
       marginBottom:20,
       marginTop:20,
       backgroundColor:'#fff'
     }} 
 />
            <Text style={{color:'#fff', fontSize:14, fontFamily: 'CircularStd'}}>Hassle Free Finance For Your Education, {"\n"}</Text>
            <Text style={{color:'#fff', fontSize:14, fontFamily: 'CircularStd'}}> Delivered Online.</Text>
					</View>
          </ImageBackground>
			</ImageBackground>
      	<Content style={styles.container} style={{backgroundColor:'white'}}>
		
              
                
          <View style={{paddingLeft:20, paddingRight:20, marginTop:3}}>
          <Item floatingLabel style={styles.marginInput}>
            <Label style={styles.level}>Mobile Number</Label>
           <Input returnKeyType="done" keyboardType="numeric" maxLength={10} ref= {(el) => { this.applicant_contact_no = el; }}
    onChangeText={(applicant_contact_no) => this.saveData('applicant_contact_no', applicant_contact_no)}
    value={this.state.applicant_contact_no} onSubmitEditing={ () => this._customerLogin } />
    { this.state.applicant_contact_no_unvalid == true   &&
    <Icon name='close-circle' style={{ color: 'red'}} />
    }
          </Item>
          </View>
          <View style={styles.Dirloginbuttonview} >
          <Button rounded block title="Login" style={{backgroundColor:'#f7a700'}} onPress={this._customerLogin}>
                   <Text style={styles.LoginText}>Continue</Text>
            </Button>
                
        </View>

      <View style={styles.container}>
        <LinkedInModal
         ref={ref => { this.modal = ref }}
          clientID="813tuzaf82c5gu"
          clientSecret="YUh0FjPUNSs5Ndrp"
          redirectUri="http://localhost/linkedin"
          onSuccess={token =>  {this.getLinkedinLogin(token)}  }
          linkText=''
     
        />
         
        
      </View>
          
       <View style={{flex:1,justifyContent:'center', alignItems:'center'}}><Text> OR </Text></View>

        <View style={styles.loginbuttonview}>
          <Button rounded block title="Linkedin"
          onPress={() => this.modal.open()} iconLeft>
           <Icon name='logo-linkedin' />
                      <Text style={styles.LoginText}>Login with Linkedin</Text>
                    </Button>
                
                </View>
          
                 <View style={styles.loginbuttonview}>
          <Button rounded block title="Google"
          onPress={this._signIn} iconLeft>
                   <Icon name='logo-googleplus' />
                      <Text style={styles.LoginText}>Login With Google</Text>
                    </Button>
                
                </View>
                
                <View style={styles.loginbuttonview}>
          <Button rounded block title="Facebook"
          onPress={this._facebookData} iconLeft>
                   <Icon name='logo-facebook' />
                      <Text style={styles.LoginText}>Login With Facebook</Text>
                    </Button>
                
                </View>
                
                
                

          
         
          </Content>
			</Container>
      </DismissKeyboard>
		);
	}
}

export default Login;
