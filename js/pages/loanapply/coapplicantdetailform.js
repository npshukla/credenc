import React, { Component } from "react";
import { View ,Platform,AsyncStorage, KeyboardAvoidingView , Alert,TouchableHighlight,BackHandler,ToastAndroid ,Keyboard, TouchableWithoutFeedback, ScrollView,NetInfo} from 'react-native';
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
   Toast,
   Root
 
//  Form,
  
} from "native-base";
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';


const Dimensions = require('Dimensions');

const window = Dimensions.get('window');


import styles from "./styles";
const drawerImage = require("../../../img/bitmap.png");
const personImage = require("../../../img/persion.png");

//import Exponent, { DocumentPicker, Constants, ImagePicker, registerRootComponent,FileSystem } from 'expo';
import {  Image } from 'react-native';

var BUTTONS = [
  { text: "Open Camera", icon: "camera", iconColor: "#2c8ef4" },
  { text: "Image", icon: "image", iconColor: "#f42ced" },
  { text: "Doc", icon: "document", iconColor: "#ea943b" },
 
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];

var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 3;

// Keyboard dismiss
const DismissKeyboard=({ children })=> (
  <TouchableWithoutFeedback onPress = {()=>Keyboard.dismiss()}>
  {children}
  </TouchableWithoutFeedback>
);



class Coapplicantdetailform extends Component {
 constructor(props) {
    super(props);

this.state = {  
    
showFooter: true,
   applicant_contact_no:'', 
   coapplicant_relation : '',
   coapplicant_occupation  : 'salaried',
   coapplicant_company_name : '',
   coapplicant_monthly_income : '',
   coapplicant_business_type :   '',
   coapplicant_business_itr   :  '',
   coapplicant_monthly_pension : '',
   coapplicant_occupation_salaried: true ,
   coapplicant_occupation_selfemp : false,
    coapplicant_occupation_pensioner : false,
    applicant_profile_image:personImage
    };

console.debug('startup');



  } 
  
  
async componentDidMount() {
    
this.setState({"showFooter": true});
 this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {


                if (this.lastBackButtonPress + 2000 >= new Date().getTime()) {
                    BackHandler.exitApp();
                    return true;
                }
                // ToastAndroid.show('Press again to exit :)', ToastAndroid.SHORT);
                this.lastBackButtonPress = new Date().getTime();
this.props.navigation.navigate('Applicantprofessionalform');
                return true;
                
             });    
     
   this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
 this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));       
    
 // ASYNC STORAGE TO STATE
await  AsyncStorage.setItem("current_step", 'Coapplicantdetailform');

   
        NetInfo.getConnectionInfo().then((connectionInfo) => {
  
  if(connectionInfo.type == 'none')
  {
    // No Internet
   
var dataKeys = new Array('applicant_contact_no','coapplicant_relation','coapplicant_occupation','coapplicant_company_name','coapplicant_monthly_income','coapplicant_business_type','coapplicant_business_itr','coapplicant_monthly_pension', 'applicant_profile_image');
   
AsyncStorage.multiGet(dataKeys, (err, stores) =>
    { stores.map((result, i, store) => {  
    
let key = store[i][0]; 

let value = store[i][1];


 if(key == 'applicant_profile_image')
{
if(value != null){
let source = { uri: value };    
 this.setState({ [key]: source }); 
 }   
} 
else{
    
if(key == 'coapplicant_occupation')
{
   // console.log(key+' '+value);

   
    if(value == 'salaried')
    {
     this.setState({"coapplicant_occupation_salaried": true});
     this.setState({"coapplicant_occupation_selfemp": false});
     this.setState({"coapplicant_occupation_pensioner": false});
                            
    }
    if(value == 'self-employed')
    {
     this.setState({"coapplicant_occupation_salaried": false});
     this.setState({"coapplicant_occupation_selfemp": true});
     this.setState({"coapplicant_occupation_pensioner": false});
     
    }
    if(value == 'pensioner')
    {
     this.setState({"coapplicant_occupation_salaried": false});
     this.setState({"coapplicant_occupation_selfemp": false});
     this.setState({"coapplicant_occupation_pensioner": true});
    }
    
}
else
{
    
 this.setState({ [key]: value });   
}

    
} 

                });
            });
            
            
                       
  }
  else
  {
    // Internet  
   
var dataKeys = new Array('applicant_contact_no', 'applicant_profile_image');
   
AsyncStorage.multiGet(dataKeys, (err, stores) =>
    { stores.map((result, i, store) => {  
    
let key = store[i][0]; 

let value = store[i][1];

if(key == 'applicant_contact_no')
{
 
  this._dataSync(value);
  this.setState({ [key]: value });
    
}
else if(key == 'applicant_profile_image')
{
//if(value != null){
//let source = { uri: value };    
// this.setState({ [key]: source }); 
// }   
} 
else{
    
if(key == 'coapplicant_occupation')
{
   // console.log(key+' '+value);

   
    if(value == 'salaried')
    {
     this.setState({"coapplicant_occupation_salaried": true});
     this.setState({"coapplicant_occupation_selfemp": false});
     this.setState({"coapplicant_occupation_pensioner": false});
                            
    }
    if(value == 'self-employed')
    {
     this.setState({"coapplicant_occupation_salaried": false});
     this.setState({"coapplicant_occupation_selfemp": true});
     this.setState({"coapplicant_occupation_pensioner": false});
     
    }
    if(value == 'pensioner')
    {
     this.setState({"coapplicant_occupation_salaried": false});
     this.setState({"coapplicant_occupation_selfemp": false});
     this.setState({"coapplicant_occupation_pensioner": true});
    }
    
}
else
{

 this.setState({ [key]: value }); 
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
  
     // ADD FACEBOOK , LINKED , GOOGLE DATA HERE
        
     let formSubmitObject = {
         
        
        coapplicant_relation :  this.state.coapplicant_relation,
   coapplicant_occupation  : this.state.coapplicant_occupation,
   coapplicant_company_name :  this.state.coapplicant_company_name,
   coapplicant_monthly_income : this.state.coapplicant_monthly_income,
   coapplicant_business_type :   this.state.coapplicant_business_type,
   coapplicant_business_itr   :  this.state.coapplicant_business_itr,
   coapplicant_monthly_pension : this.state.coapplicant_monthly_pension,
          applicant_contact_no:   this.state.applicant_contact_no

         
     };
     
   // console.log(formSubmitObject);    
 var url = global.serverUrl+'/appnew/form/coapplicant_detail';
//console.log(url); 
 fetch(url, {
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
    console.log("response: " + responseData);
   arr = JSON.parse(responseData);
console.log(arr);
if(arr !== 'failed'){

      return 'sucess';
      }
      
return 'failed';
    
 })
.catch((err) => { console.log(err); });  
     
  
     
 }
 


async saveData(key,value)
{
   
    

if(key == 'coapplicant_relation')
{
 this.setState({"coapplicant_relation": value}); 
 await  AsyncStorage.setItem("coapplicant_relation", value); 
}

if(key == 'coapplicant_occupation')
{
     console.log(value);
     

 
 try {
  AsyncStorage.setItem("coapplicant_occupation", value);
} catch (error) {
  // Error saving data
  console.log('error in saving data');
}
 this.setState({"coapplicant_occupation": value}); 
 
  

 if(value == 'salaried')
 {
  this.setState({"coapplicant_occupation_salaried": true});
  this.setState({"coapplicant_occupation_selfemp": false});
  this.setState({"coapplicant_occupation_pensioner": false});   
     
 }
 if(value == 'self-employed')
 {
 this.setState({"coapplicant_occupation_salaried": false});
  this.setState({"coapplicant_occupation_selfemp": true});
  this.setState({"coapplicant_occupation_pensioner": false});  
     
 }
 
 if(value == 'pensioner')
 {
   this.setState({"coapplicant_occupation_salaried": false});
  this.setState({"coapplicant_occupation_selfemp": false});
  this.setState({"coapplicant_occupation_pensioner": true});  
     
 }
 
}

if(key == 'coapplicant_company_name')
{
 this.setState({"coapplicant_company_name": value}); 
 await  AsyncStorage.setItem("coapplicant_company_name", value); 
}

if(key == 'coapplicant_monthly_income')
{
 this.setState({"coapplicant_monthly_income": value}); 
 await  AsyncStorage.setItem("coapplicant_monthly_income", value); 
}

if(key == 'coapplicant_business_type')
{
 this.setState({"coapplicant_business_type": value}); 
 await  AsyncStorage.setItem("coapplicant_business_type", value); 
}

if(key == 'coapplicant_business_itr')
{
    
console.log(value);
 this.setState({"coapplicant_business_itr": value}); 
 await  AsyncStorage.setItem("coapplicant_business_itr", value); 
}

if(key == 'coapplicant_monthly_pension')
{
 this.setState({"coapplicant_monthly_pension": value}); 
 await  AsyncStorage.setItem("coapplicant_monthly_pension", value);
 
}



   
}





_nextStep = async () => {
  
formResp = await this._submitFormData();
console.log(formResp);
// SUBMIT DATA TO SERVER
if(formResp !== 'failed'){


this.props.navigation.navigate('Coapplicantdocform');
}
else
{
  //  Alert.alert( 'Alert', 'Error Occured' );
}

	}
        
         _prevStep = async () => {
console.log("here");

this.props.navigation.navigate('Applicantprofessionalform');
	}

 
      _dataSync = async (applicant_contact_no) =>
 {
  
         if(applicant_contact_no == null)
        {
         
            return 'failed';
        }
    
     let formSubmitObject = {
         
         applicant_contact_no : applicant_contact_no,
        'screen':'Coapplicantdetailform'
          
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


if(prop == 'coapplicant_occupation')
{
    console.log(prop+':'+arr[prop]);

   
    if(arr[prop] == 'salaried')
    {
     this.setState({"coapplicant_occupation_salaried": true});
     this.setState({"coapplicant_occupation_selfemp": false});
     this.setState({"coapplicant_occupation_pensioner": false});
                            
    }
    if(arr[prop] == 'self-employed')
    {
     this.setState({"coapplicant_occupation_salaried": false});
     this.setState({"coapplicant_occupation_selfemp": true});
     this.setState({"coapplicant_occupation_pensioner": false});
     
    }
    if(arr[prop] == 'pensioner')
    {
     this.setState({"coapplicant_occupation_salaried": false});
     this.setState({"coapplicant_occupation_selfemp": false});
     this.setState({"coapplicant_occupation_pensioner": true});
    }
    
}
else
{

if(prop == 'applicant_profile_image' && arr[prop] != null)
{
    var image_path = global.serverUrl+arr[prop].replace('\\','');
   
    let source = { uri: image_path };    
 this.setState({applicant_profile_image : source });
    
}
else
{
 this.setState({ [prop]: arr[prop] });    
    
}
  
    
}

  }
}  
    
    
}
 
 })
.catch((err) => { console.log(err); });  
     
 }
    
    
    

render() {
    
   

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

        <ActionSheet ref={(c) => { ActionSheet.actionsheetInstance = c; }} />
         <View style={styles.profileheading} style={{paddingBottom:5}}>
            <Text style={styles.ProgressHeading1}>Co-Applicant details</Text>
            <Label style={styles.ProgressHeading2}>We need following details of the co-applicant</Label>
        </View> 
        <View style={{paddingLeft:12, paddingBottom:12}}>
        <Progress.Bar progress={0.8} width={200}  color="#f7a700" borderColor="#2e1e71" backgroundColor="#2e1e71"/>
        </View>

        <Content style={styles.content}>     
            
         <View style={{marginLeft:10}}>
           
             <Item>
          <Picker
              mode="dialog"
              placeholder="Relation  "
              iosHeader="Your Header"
              style={{width: window.width-30, marginTop:5}}
              
             selectedValue={this.state.coapplicant_relation}
              onValueChange={(coapplicant_relation) => this.saveData('coapplicant_relation', coapplicant_relation)}
             
            >
            <Item label="Relation with co-applicant" value="null"/>
              <Item label="Father" value="father"/>
              <Item label="Mother" value="mother" />
              <Item label="Wife" value="wife" />
               <Item label="Husband" value="husband" />
              <Item label="Brother" value="brother" />
               <Item label="Sister" value="sister" />
               <Item label="Other" value="other" />
              
            </Picker>  
            </Item> 
           
            <View>
            <Item  style={{paddingTop:10, paddingBottom:10}}>
              <Radio selected={this.state.coapplicant_occupation_salaried}
            onPress={() => this.saveData("coapplicant_occupation",'salaried')}></Radio>
    
              <Text style={styles.RadioField} onPress={() => this.saveData("coapplicant_occupation",'salaried')}>Salaried</Text>
          
              <Radio selected={this.state.coapplicant_occupation_selfemp}
            onPress={() => this.saveData("coapplicant_occupation",'self-employed')} style={{paddingLeft:10}}></Radio>
              
              <Text style={styles.RadioField} onPress={() => this.saveData("coapplicant_occupation",'self-employed')}>Self Employed</Text>
            

              <Radio selected={this.state.coapplicant_occupation_pensioner}
            onPress={() => this.saveData("coapplicant_occupation",'pensioner')} style={{paddingLeft:10}}></Radio>
            
              <Text style={styles.RadioField} onPress={() => this.saveData("coapplicant_occupation",'pensioner')}>Pensioner</Text>
            
            </Item>
           </View>

{this.state.coapplicant_occupation_salaried &&

<Item floatingLabel>
            <Label style={styles.level}>Company Name</Label>
            <Input ref= {(el) => { this.coapplicant_company_name = el; }}
    onChangeText={(coapplicant_company_name) => this.saveData('coapplicant_company_name', coapplicant_company_name)} 
    value={this.state.coapplicant_company_name}  style={styles.InputField}/>
   
          </Item> 


          
          
   }
   
   {this.state.coapplicant_occupation_salaried &&
   <Item floatingLabel  style={{marginLeft:5}}>
            <Label style={styles.level}>Monthly Income</Label>
            <Input keyboardType="numeric" ref= {(el) => { this.coapplicant_monthly_income = el; }}
    onChangeText={(coapplicant_monthly_income) => this.saveData('coapplicant_monthly_income', coapplicant_monthly_income)} 
    value={this.state.coapplicant_monthly_income} style={styles.InputField}/>
   
          </Item> 
   
  }
   
   {this.state.coapplicant_occupation_selfemp &&

          <Item>
          <Picker
               mode="dialog"
              placeholder="Business Type"
              iosHeader="Your Header"
              style={{ width: window.width-30}}
              
            selectedValue={this.state.coapplicant_business_type}
              onValueChange={(coapplicant_business_type) => this.saveData( 'coapplicant_business_type' ,coapplicant_business_type)}
             
            >
            <Item label="company" value="company" styles={styles.pickerFont}/>
            <Item label="individual professional" value="individual-professional" styles={styles.pickerFont}/>
             
              
            </Picker>  
            </Item>

        }

{this.state.coapplicant_occupation_selfemp &&

           <Item floatingLabel style={{marginLeft:5}}>
            <Label style={styles.level}>ITR</Label>
            <Input keyboardType="numeric" ref= {(el) => { this.coapplicant_business_itr = el; }}
    onChangeText={(coapplicant_business_itr) => this.saveData('coapplicant_business_itr', coapplicant_business_itr)} 
    value={this.state.coapplicant_business_itr} style={styles.InputField}/>
   
          </Item> 
           
   }
   
   {this.state.coapplicant_occupation_pensioner &&

           <Item floatingLabel style={{marginLeft:5}}>
            <Label style={styles.level}>Monthly Pension</Label>
            <Input keyboardType="numeric" ref= {(el) => { this.coapplicant_monthly_pension = el; }}
    onChangeText={(coapplicant_monthly_pension) => this.saveData('coapplicant_monthly_pension', coapplicant_monthly_pension)} 
    value={this.state.coapplicant_monthly_pension} style={styles.InputField}/>
   
          </Item> 
          
   }   
   
   
                                                                        
            
            </View>  
    

        <View>

        </View>
      
      </Content>
      
      
      { this.state.showFooter &&

        <Footer style={{backgroundColor:'white'}}>
                         <Left style={{paddingLeft:12}}>
                        <Button half onPress={this._prevStep} style={{borderRadius:30,backgroundColor:'#fff', width:100, alignItems:'center', justifyContent:'center', height:40}}>
                            <Text style={{color:'black'}}>Back</Text>
                        </Button>
                    </Left>
                    
                    <Right style={{paddingRight:12}}>
                        <Button warning half onPress={this._nextStep} style={{borderRadius:30,backgroundColor:'#f7a700',width:100, alignItems:'center', justifyContent:'center', height:40}}>
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
            


    
    
export default Coapplicantdetailform;
