import React, { Component } from "react";
import { Animated, View ,Platform,AsyncStorage, KeyboardAvoidingView,Alert,TouchableHighlight,BackHandler,ToastAndroid, Keyboard, TouchableWithoutFeedback, ScrollView,NetInfo } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
   ListItem,
   Text,
   Radio,
   Picker,
   ActionSheet,
    Spinner,
    Root
 
//  Form,
  
} from "native-base";



import styles from "./styles";


//import Exponent, { DocumentPicker, Constants, ImagePicker, registerRootComponent,FileSystem } from 'expo';
import {  Image } from 'react-native';
import AutoComplete from 'react-native-autocomplete-select';
import LinearGradient from 'react-native-linear-gradient';


const suggestions = [
  {text: 'delhi,delhi'}
  
];



var BUTTONS = [
  { text: "Open Camera", icon: "camera", iconColor: "#2c8ef4" },
  { text: "Image", icon: "image", iconColor: "#f42ced" },
  { text: "Doc", icon: "document", iconColor: "#ea943b" },
 
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];

var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 3;


const drawerImage = require("../../../img/bitmap.png");
const personImage = require("../../../img/persion.png");


// Keyboard dismiss
const DismissKeyboard=({ children })=> (
  <TouchableWithoutFeedback onPress = {()=>Keyboard.dismiss()}>
  {children}
  </TouchableWithoutFeedback>
);



class Loanapply extends Component {
 constructor(props) {
    super(props);

this.state = {  
      applicant_full_name: '',
      applicant_contact_no: '',
      applicant_current_city: '',
         applicant_profile_image:personImage,
      current_step:'Loanapply',
      applicant_contact_no_valid:false,
      cityList:suggestions,
      city_list_show:'false',
      showFooter: true
    };

console.debug('startup');

  } 
  
  
   async componentDidMount() {
   
   this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {


                if (this.lastBackButtonPress + 2000 >= new Date().getTime()) {
                    BackHandler.exitApp();
                    return true;
                }
                ToastAndroid.show('Press again to exit :)', ToastAndroid.SHORT);
                this.lastBackButtonPress = new Date().getTime();
this.props.navigation.navigate('Loanapplystart');

                return true;
                
             });     
 this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
 this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));       
        
        
  //ASYNC STORAGE TO STATE       
//console.log(global.serverUrl);

// ASYNC STORAGE TO STATE
await  AsyncStorage.setItem("current_step", 'Loanapplystart');

//this.allCollegesData('delhi');

NetInfo.getConnectionInfo().then((connectionInfo) => {
  
  if(connectionInfo.type == 'none')
  {
    // No Internet
   
 var dataKeys = new Array('applicant_full_name','applicant_contact_no','applicant_current_city', 'applicant_profile_image','googleToken','googleData','linkedinToken','linkedinData','facebookToken','facebookData');
   
AsyncStorage.multiGet(dataKeys, (err, stores) =>
    { stores.map((result, i, store) => {  
    
let key = store[i][0]; 

let value = store[i][1];
//console.log(key);
//console.log(value);

if(key == 'applicant_profile_image')
{
if(value != null){
let source = { uri: value };    
 this.setState({ [key]: source }); 
 }   
}   
else{
this.setState({ [key]: value });
}

if(key == 'applicant_contact_no')
{

    if(this.state.applicant_contact_no != null)
    {
       this.setState({ applicant_contact_no_valid: true }); 
        
    }
     
}


                });
                
           
            
            });               
                       
  }
  else
  {
    // Internet  
   
   
  var dataKeys = new Array('applicant_contact_no', 'applicant_full_name'  ,'applicant_profile_image','googleToken','googleData','linkedinToken','linkedinData','facebookToken','facebookData');
   
AsyncStorage.multiGet(dataKeys, (err, stores) =>
    { stores.map((result, i, store) => {  
    
let key = store[i][0]; 

let value = store[i][1];

if(key == 'applicant_contact_no')
{
 
  this._dataSync(value); 
  this.setState({ [key]: value });
    
}



if(key == 'applicant_profile_image')
{
//if(value != null){
//let source = { uri: value };    
// this.setState({ [key]: source }); 
// }
 
}   
else{
this.setState({ [key]: value });
}

if(key == 'applicant_contact_no')
{

    if(this.state.applicant_contact_no != null)
    {
       this.setState({ applicant_contact_no_valid: true }); 
        
    }
     
}


                });
                
           
            
            });  
    
      
  }
  
});







      
     
  // ASYNC STORAGE TO STATE 

  }
  
  async componentWillUnmount()  
{
    
 this.backButtonListener.remove();   
    
 this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        
} 
 
_keyboardDidShow () {
        this.setState({showFooter: false});
    }

    _keyboardDidHide () {
        this.setState({showFooter: true});
    }

 
 _submitFormData = async () =>
 {
  
     console.log('form submit');
         if(this.state.applicant_contact_no == null)
        {
            
            
            
            this.setState({ applicant_contact_no_unvalid: true });
            
            return 'failed';
        }
     // ADD FACEBOOK , LINKED , GOOGLE DATA HERE
        
     let formSubmitObject = {
         applicant_full_name : this.state.applicant_full_name,
         applicant_contact_no : this.state.applicant_contact_no,
         applicant_current_city : this.state.applicant_current_city,
         
         googleToken : this.state.googleToken,
         googleData : this.state.googleData,
         linkedinToken : this.state.linkedinToken,
         linkedinData : this.state.linkedinData,
         facebookToken : this.state.facebookToken,
         facebookData : this.state.facebookData
         
         
     };
     
     
 var url = global.serverUrl+'/appnew/form/basic_detail';

await fetch(url, {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify(formSubmitObject)
})
.then(
(response) => response.text()
) 
.then((responseData) => { 
    console.log(responseData);
   arr = JSON.parse(responseData);

return 'success';
    
 })
.catch((err) => { console.log(err); });  
     
 }
 
 
 
 
 async allCollegesData(query) {
//console.log(query);
//var query = 'indian';

url = global.serverUrl+'/appnew/form/cityList?query='+query;
console.log(url);
 fetch(url, {
  method: 'GET',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           }
})
.then(
(response) => response.text()
) 
.then((responseData) => {
    
console.log(responseData);

    if(responseData !== 'none'){
                    this.setState({cityList: JSON.parse(responseData)}) ; this.setState({ city_list_show: 'true' }); }
  })
.catch((err) => { console.log(err); });   
    
    
    
    
}
 
async saveData(key,value)
{ 
    

if(key == 'applicant_full_name')
{
 this.setState({"applicant_full_name": value}); 
 await  AsyncStorage.setItem("applicant_full_name", value); 
}

if(key == 'applicant_contact_no')
{
 this.setState({"applicant_contact_no": value}); 
 await  AsyncStorage.setItem("applicant_contact_no", value);
 
 this.setState({ applicant_contact_no_unvalid: false });

}

// new added

if (key=='applicant_current_city') {
    

  this.setState({"applicant_current_city":value});
  this.allCollegesData(value);
   AsyncStorage.setItem("applicant_current_city",value);
}

 
}


_nextStep = async () => {
    


applicant_full_name = this.state.applicant_full_name;
//await AsyncStorage.setItem("basic_detail_step","not-complete");


// SUBMIT DATA TO SERVER
formResp = await this._submitFormData();
console.log(formResp);
// SUBMIT DATA TO SERVER
if(formResp !== 'failed'){

    
 this.props.navigation.navigate('Customerimageform'); 

}
else
{
   // Alert.alert( 'Alert', 'Error Occured' );
}
 


	}




 _dataSync = async (applicant_contact_no) =>
 {
  
         if(applicant_contact_no == null)
        {
         
            return 'failed';
        }
    
     let formSubmitObject = {
         
         applicant_contact_no : applicant_contact_no,
        'screen':'Loanapplystart'
          
     };
 console.log(formSubmitObject);    
      
 var url = global.serverUrl+'/appnew/form/alldatanew';

await fetch(url, {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify(formSubmitObject)
})
.then(
(response) => response.text()
) 
.then((responseData) => { 
    console.log(responseData);
   arr = JSON.parse(responseData);

if(arr !== 'none')
{
    
  for (var prop in arr) {
  if (arr.hasOwnProperty(prop)) { 
console.log(prop);
if(prop == 'applicant_profile_image' && arr[prop] != null)
{
    var image_path = global.serverUrl+arr[prop].replace('\\','');
   
    let source = { uri: image_path };    
 this.setState({applicant_profile_image : source });
  console.log('image done');  
}
else
{
 this.setState({ [prop]: arr[prop] });   
    
}

   
   
   
  }
}  
    
    
}




    
 })
.catch((err) => { console.log(err); });  
     
 }







//onSelect = async (suggestion) => {    
//
//this.saveData("applicant_current_city",suggestion.text);
//
//  
//}

//changeText = async (value) => {    
//
//this.saveData("applicant_current_city",value);
//
//}  




render() {
    
   
  
 const onSelect = (suggestion) => {
 // console.log('college name :'+suggestion.text); // the pressed suggestion

  this.setState({ "applicant_current_city":suggestion.text});
 AsyncStorage.setItem("applicant_current_city", suggestion.text);

 Keyboard.dismiss();

}   
    

    const forwardIcon = <Icon name={'ios-arrow-forward'} color={'gray'} size={20} />;
    const alertIcon = <Icon name={'ios-alert'} color={'gray'} size={20} />;
    return (
      <DismissKeyboard>
        <LinearGradient colors={['#352182', '#4f35cb']} style={styles.linearGradient1}>
        <Header style={styles.headercol}>
          <Left style={{width:100}}>
            <Image source={drawerImage} style={styles.logo}/>
          </Left>
          <Right>
           <TouchableHighlight  underlayColor="white" onPress={() => this.props.navigation.navigate("Profile")}>
           <View
   style={{
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:40,
       height:40,
       backgroundColor:'#fff',
       borderRadius:40,
     }} 
 > 
   <Image source={this.state.applicant_profile_image} style={styles.profileImg}/>
 </View>
 </TouchableHighlight>
          </Right>
        </Header>

         <View style={styles.profileheading}>
            <Text style={styles.ProgressHeading1}>Hi {this.state.applicant_full_name}</Text>
            <Label style={styles.ProgressHeading2}>Let's get started with your loan application</Label>
        </View>  

        <Content style={styles.content}>
     
     <View full style={{borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow:'hidden'}}>
           
           
            <Item floatingLabel style={styles.marginInput}>
            <Label style={styles.level}>Name</Label>
            <Input  ref= {(el) => { this.applicant_full_name = el; }}
    onChangeText={(applicant_full_name) => this.saveData('applicant_full_name', applicant_full_name)} 
    value={this.state.applicant_full_name}  style={styles.InputField}/>
   
          </Item>
          
          <Item floatingLabel style={styles.marginInput} disabled={this.state.applicant_contact_no_valid} >
          <Label style={styles.level}>Mobile No</Label>
            <Input keyboardType="numeric" maxLength={10} ref= {(el) => { this.applicant_contact_no = el; }}
    onChangeText={(applicant_contact_no) => this.saveData('applicant_contact_no', applicant_contact_no)}
    value={this.state.applicant_contact_no} disabled={this.state.applicant_contact_no_valid} style={styles.InputField}/>
    { this.state.applicant_contact_no_unvalid == true   &&
    <Icon name='close-circle' style={{ color: 'red'}} />
    }
    </Item>
    <Item style={styles.marginInput}>
           
                   
         <AutoComplete
          onSelect={onSelect}
          placeholder="Current City"
          minimumSimilarityScore={0.5}
          suggestions={this.state.cityList}
          onChangeText={(applicant_current_city) => this.saveData('applicant_current_city', applicant_current_city)}
          suggestionObjectTextProperty='text'
          value={this.state.applicant_current_city}
          suggestionStyle={{minHeight:30,borderBottomWidth:1, backgroundColor:'white'}}
          underlineColorAndroid='transparent'
        />
            
          
        </Item>

        </View>
      </Content>
      
      {this.state.showFooter &&
       <Footer style={{backgroundColor:'white'}}>
                        
                    
                    <Right style={{paddingRight:12}}>
                        <Button half onPress={this._nextStep} style={{borderRadius:30, backgroundColor:'#f7a700' ,width:100, alignItems:'center', justifyContent:'center', height:40}}>
                            <Text>Next</Text>
                        </Button>
                    </Right>
       
        </Footer>
        }
      
      
      </LinearGradient>
      </DismissKeyboard>
);
                }
            }
            


    
    
export default Loanapply;
