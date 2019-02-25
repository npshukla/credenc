import React, { Component } from "react";
import { Animated, View ,Platform,AsyncStorage, KeyboardAvoidingView,Alert ,TouchableHighlight, Linking,BackHandler,ToastAndroid,NetInfo} from 'react-native';
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
  List,
  Icon,
   ListItem,
   Text,
   Radio,
   Picker,
   ActionSheet,
   Root
    
 
//  Form,
  
} from "native-base";



import styles from "./styles";
import renderIf from './renderIf';


//import Exponent, { DocumentPicker, Constants, ImagePicker, registerRootComponent,FileSystem } from 'expo';
import {  Image } from 'react-native';
import AutoComplete from 'react-native-autocomplete-select';
import Communications from 'react-native-communications';
import Spinner from 'react-native-loading-spinner-overlay';

import firebase from 'react-native-firebase';

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
const uploadImage = require("../../../img/upload-button.png");


class Profile extends Component {
 constructor(props) {
    super(props);

this.state = {  
      applicant_full_name: '',
      applicant_contact_no: '',
      applicant_current_city: '',
      current_step:'Profile',
      applicant_college_admitted:'',
      admission_status:false,
      applicant_pan_uploaded:'',
      applicant_aadhar_uploaded:'',
      applicant_passport_uploaded:'',
       applicant_i20_uploaded: '',
     applicant_admission_letter_uploaded: '',
     applicant_resume_uploaded: 'false',
      applicant_total_work_experience:'0',
      applicant_salary_slip_uploaded:'',
      applicant_form_16_uploaded:'',
      applicant_office_id_uploaded:'',
       currently_employed:false,
      never_employed:false,
      
      applicant_college_type:"india",
      coapplicant_company_name:'',
      coapplicant_monthly_income:'',
      coapplicant_business_type:'',
      coapplicant_business_itr:'',
      coapplicant_monthly_pension:'',
      coapplicant_adhar_card_uploaded:'',
      coapplicant_pan_card_uploaded:'',
      coapplicant_form_16_uploaded:'',
      coapplicant_current_account_statement_uploaded:'',
      coapplicant_personal_account_statement_uploaded:'',
      coapplicant_bank_statement_uploaded:'',
      coapplicant_itr_uploaded:'',
      coapplicant_occupation:'salaried',
      coapplicant_occupation_status:'',
      applicant_profile_image:personImage,
      visible:true,
      lead_status:'Pending'
    };

console.debug('startup');

  } 
//  'not-complete','complete','document-pending','send-to-bank','approved','disbursed','close'
  
   async componentDidMount() {
    
       this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {


                if (this.lastBackButtonPress + 2000 >= new Date().getTime()) {
                    BackHandler.exitApp();
                    return true;
                }
                // ToastAndroid.show('Press again to exit :)', ToastAndroid.SHORT);
                // this.lastBackButtonPress = new Date().getTime();
                // this.props.navigation.navigate('Loanapplicationsuccessful');

                ToastAndroid.show('Press again to exit :)', ToastAndroid.SHORT);
                this.lastBackButtonPress = new Date().getTime();
                this.props.navigation.navigate('Loanapplystart');
                
                return true;
                
             });
       
        
  //ASYNC STORAGE TO STATE       
console.log(global.serverUrl);

// ASYNC STORAGE TO STATE
//await  AsyncStorage.setItem("current_step", 'Profile');



 
        
NetInfo.getConnectionInfo().then((connectionInfo) => {
  
  if(connectionInfo.type == 'none')
  {
     
  
    // No Internet
var dataKeys = new Array('applicant_full_name','applicant_contact_no','applicant_current_city','applicant_profile_image','applicant_college_admitted','applicant_pan_uploaded','applicant_aadhar_uploaded','applicant_passport_uploaded','applicant_i20_uploaded','applicant_admission_letter_uploaded','applicant_resume_uploaded', 'applicant_total_work_experience','applicant_salary_slip_uploaded','applicant_form_16_uploaded','applicant_office_id_uploaded','coapplicant_company_name','coapplicant_monthly_income','coapplicant_business_type','coapplicant_business_itr','coapplicant_monthly_pension','coapplicant_adhar_card_uploaded','coapplicant_pan_card_uploaded','coapplicant_form_16_uploaded','coapplicant_current_account_statement_uploaded','coapplicant_personal_account_statement_uploaded','coapplicant_bank_statement_uploaded','coapplicant_itr_uploaded','coapplicant_occupation');
   
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
else if(key=='applicant_college_admitted') {
   if(value == 'admitted'){
      this.setState({"admission_status": true});
   }
   else{
      this.setState({"admission_status": false});
   }
}
else if(key=='coapplicant_occupation') {
  
   if(value == 'salaried'){
      this.setState({"coapplicant_occupation_status": "salaried"});
   }
   if(value == 'self-employed'){
      this.setState({"coapplicant_occupation_status": "self-employed"});
    }
    if(value == 'pensioner'){
      this.setState({"coapplicant_occupation_status": "pensioner"});
    }
}
else{
  this.setState({ [key]: value });
}


                });
                this.setState({visible: false});
                
            });              
                       
  }
  else
  {
    // Internet  
   
   
var dataKeys = new Array('applicant_contact_no','applicant_profile_image');
   
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
else if(key=='applicant_college_admitted') {
   if(value == 'admitted'){
      this.setState({"admission_status": true});
   }
   else{
      this.setState({"admission_status": false});
   }
}
else if(key=='coapplicant_occupation') {
  
   if(value == 'salaried'){
      this.setState({"coapplicant_occupation_status": "salaried"});
   }
   if(value == 'self-employed'){
      this.setState({"coapplicant_occupation_status": "self-employed"});
    }
    if(value == 'pensioner'){
      this.setState({"coapplicant_occupation_status": "pensioner"});
    }
}
else{
  this.setState({ [key]: value });
}

                });
                
                
            });
            
            
    
      
  }
  
});        
        
        
        
        
        
  // ASYNC STORAGE TO STATE 
  
  
  firebase.analytics().setAnalyticsCollectionEnabled(true);
  firebase.analytics().setCurrentScreen('Profile');

  }
  
  
  async componentWillUnmount()  
{
    
 this.backButtonListener.remove();   
    
    
}


 
 _submitFormData = async () =>
 {
  
     console.log('form submit');
  
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
     
    console.log(JSON.stringify(formSubmitObject));    
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
    console.log("response: " + responseData);
   arr = JSON.parse(responseData);
console.log(arr);

//if(arr !== 'failed'){
//AsyncStorage.setItem('app_user_id',arr.app_user_id.toString());
//      AsyncStorage.setItem('borrower_uuid', arr.borrower_uuid.toString());
//      AsyncStorage.setItem('lead_id', arr.lead_id.toString());
//      return 'sucess';
//      }
      
return 'failed';
    
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
  await AsyncStorage.setItem("applicant_current_city",value);
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
    Alert.alert( 'Alert', 'Error Occured' );
}
 


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

 _dataSync = async (applicant_contact_no) =>
 {
  
         if(applicant_contact_no == null)
        {
         
            return 'failed';
        }
    
     let formSubmitObject = {
         
         applicant_contact_no : applicant_contact_no,
        'screen':'Profile'
          
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
if(prop == 'applicant_profile_image' && arr[prop] != null)
{
    
  var image_path = global.serverUrl+arr[prop].replace('\\','');
   
    let source = { uri: image_path };    
 this.setState({applicant_profile_image : source });
 console.log(image_path);
}
else if(prop=='applicant_college_admitted') {
   if(arr[prop] == 'admitted'){
      this.setState({"admission_status": true});
   }
   else{
      this.setState({"admission_status": false});
   }
}
else if(prop=='coapplicant_occupation') {
  
   if(arr[prop] == 'salaried'){
      this.setState({"coapplicant_occupation_status": "salaried"});
   }
   if(arr[prop] == 'self-employed'){
      this.setState({"coapplicant_occupation_status": "self-employed"});
    }
    if(arr[prop] == 'pensioner'){
      this.setState({"coapplicant_occupation_status": "pensioner"});
    }
}
else if(prop == 'applicant_occupation' )
{
 
 if(arr[prop] == 'currently-employed')
{
    
  this.setState({"currently_employed": true});
  this.setState({"never_employed": false}); 
}    
    else
    {
    if(arr[prop] == null)
    {
      this.setState({"currently_employed": true});
  this.setState({"never_employed": false});  
    }
    else
    {
 this.setState({"currently_employed": false});
  this.setState({"never_employed": true});     
    }
    
         
    }
 
 
 
}
else{
  this.setState({ [prop]: arr[prop] });
}




    
  }
}  
    
    
}



this.setState({visible: false});
    
 })
.catch((err) => {    this.setState({visible: false}); });  
     
 }






render() {
    
    const suggestions = [
  {text: 'gurgaon'},
  {text: 'delhi'}
]
   
    const forwardIcon = <Icon name={'ios-arrow-forward'} color={'gray'} size={20} />;
    const alertIcon = <Icon name={'ios-alert'} color={'gray'} size={20} />;
    return (
       <Container style={styles.container}>
      
        <Content style={styles.Profcontent}>
 
            <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} overlayColor='rgba(0, 0, 0, 0.75)' cancelable={true} />

 
 
       <ListItem style={{elevation:0, borderWidth:0, borderColor:'#fff'}}>
          <Left>
            <Image source={this.state.applicant_profile_image} style={styles.ProfilePhoto}/>
            
            <View style={{marginLeft:10}}>
            <Text style={styles.ProfileName}>{this.state.applicant_full_name}</Text>

            <Button onPress={() => this.props.navigation.navigate("Loanapplystart")} style={{borderRadius:30,backgroundColor:'#f6f6f6' , height:25, marginLeft:10}}>
                    <Text uppercase={false} style={styles.editProfile}>Edit Profile</Text>
              </Button>
            </View>
            
          </Left>
          <Right>
            <Button half onPress={() => this.props.navigation.navigate("Logout")} style={{borderRadius:30, backgroundColor:'white', width:100, alignItems:'center', justifyContent:'center', height:40}}>
                            <Text style={{color:'black'}}>Log Out</Text>
                        </Button>
          </Right>

         
      </ListItem>

      <View style={styles.ProfileMainView}>
        <View style={styles.ProfileView}>  
          <Text note style={styles.Profileheading1}>Full Name</Text>
          <Text style={styles.Profileheading2}>{this.state.applicant_full_name}</Text>
        </View>
        <View style={styles.ProfileView}>  
          <Text note style={styles.Profileheading1}>Mobile Number</Text>
          <Text style={styles.Profileheading2}>{this.state.applicant_contact_no}</Text>
        </View>
        <View style={styles.ProfileView}>  
          <Text note style={styles.Profileheading1}>City</Text>
          <Text style={styles.Profileheading12}>{this.state.applicant_current_city}</Text>
        </View>
      </View>

      <View style={styles.Informmation1}>
        <Text> Application Status: {this.state.lead_status} </Text>
      </View>

            <ActionSheet ref={(c) => { ActionSheet.actionsheetInstance = c; }} />
             <List style={styles.ProfileMainView} style={{marginLeft:5}}>
             
{renderIf(this.state.applicant_pan_uploaded==null  || this.state.applicant_pan_uploaded=='false' || this.state.applicant_aadhar_uploaded==null || this.state.applicant_aadhar_uploaded=='false' || this.state.applicant_passport_uploaded==null || this.state.applicant_passport_uploaded=='false',  
             <ListItem>
                    <View><Text style={{textDecorationLine:'underline',fontSize:15}}>Applicant KYC</Text></View>
              </ListItem>
              )}



                {renderIf(this.state.applicant_pan_uploaded==null  || this.state.applicant_pan_uploaded=='false', 

                   <ListItem style={{marginLeft:10}}>
                         <Left>
                           <View  style={styles.inlinecss}>
                           
                            <Text style={styles.DocumentFont1}>Pan Card</Text>

                            </View>
                            
                            </Left>
                            <Right>
                            <TouchableHighlight  onPress={() =>  this.props.navigation.navigate("Applicantkycform")} underlayColor="white">
                            
                             <View iconRight success style={styles.inlinecss}>

                              <Text style={styles.DocumentFont2}>Upload</Text>
                              
                              <Image source={uploadImage} style={styles.uploadImage}/>
                              
                            </View>
                            
                            
                            
                            </TouchableHighlight>
                            </Right>
                            
                        </ListItem>

                )}
                {renderIf(this.state.applicant_aadhar_uploaded==null || this.state.applicant_aadhar_uploaded=='false', 
                  
                   <ListItem style={{marginLeft:10}}>
                         <Left>
                           <View  style={styles.inlinecss}>
                           
                            <Text style={styles.DocumentFont1}>Aadhar Card</Text>
                      
                            </View>
                            
                            </Left>
                            <Right>
                            <TouchableHighlight  onPress={() =>  this.props.navigation.navigate("Applicantkycform")} underlayColor="white">
                            
                             <View iconRight success style={styles.inlinecss}>

                              <Text style={styles.DocumentFont2}>Upload</Text>
                              
                              <Image source={uploadImage} style={styles.uploadImage}/>
                              
                            </View>
                            
                            
                            
                            </TouchableHighlight>
                            </Right>
                            
                        </ListItem>

                )}

                {renderIf(this.state.applicant_passport_uploaded==null || this.state.applicant_passport_uploaded=='false', 
                  
                   <ListItem style={{marginLeft:10}}>
                         <Left>
                           <View  style={styles.inlinecss}>
                           
                            <Text style={styles.DocumentFont1}>Passport</Text>
                            </View>
                            
                            </Left>
                            <Right>
                            <TouchableHighlight  onPress={() =>  this.props.navigation.navigate("Applicantkycform")} underlayColor="white">
                            
                             <View iconRight success style={styles.inlinecss}>

                              <Text style={styles.DocumentFont2}>Upload</Text>
                              
                              <Image source={uploadImage} style={styles.uploadImage}/>
                              
                            </View>
                            
                            
                            
                            </TouchableHighlight>
                            </Right>
                            
                        </ListItem>

                         )}


{renderIf(   (this.state.applicant_college_type == 'abroad' && (this.state.applicant_i20_uploaded==null || this.state.applicant_i20_uploaded=='false') ) || this.state.applicant_admission_letter_uploaded==null || this.state.applicant_admission_letter_uploaded=='false',  
             <ListItem>
                    <View><Text style={{textDecorationLine:'underline',fontSize:15}}>Applicant Admission Documents</Text></View>
              </ListItem>
              )}




                {renderIf( this.state.applicant_college_type == 'abroad' && (this.state.applicant_i20_uploaded==null || this.state.applicant_i20_uploaded=='false'), 
                  
                   <ListItem style={{marginLeft:10}}>
                         <Left>
                           <View  style={styles.inlinecss}>
                           
                            <Text style={styles.DocumentFont1}>Form i 20</Text>
                            </View>
                            
                            </Left>
                            <Right>
                            <TouchableHighlight  onPress={() =>  this.props.navigation.navigate("Applicantadmissionform")} underlayColor="white">
                            
                             <View iconRight success style={styles.inlinecss}>

                              <Text style={styles.DocumentFont2}>Upload</Text>
                              
                              <Image source={uploadImage} style={styles.uploadImage}/>
                              
                            </View>
                            
                            </TouchableHighlight>
                            </Right>
                            
                        </ListItem>

                )}

                 {renderIf(this.state.admission_status==true && (this.state.applicant_admission_letter_uploaded==null || this.state.applicant_admission_letter_uploaded=='false'),
                  
                   <ListItem style={{marginLeft:10}}>
                         <Left>
                           <View style={styles.inlinecss}>
                           
                            <Text style={styles.DocumentFont1}>College admission letter</Text>
                            </View>
                            
                            </Left>
                            <Right>
                            <TouchableHighlight  onPress={() =>  this.props.navigation.navigate("Applicantadmissionform")} underlayColor="white">
                            
                             <View iconRight success style={styles.inlinecss}>

                              <Text style={styles.DocumentFont2}>Upload</Text>
                              
                              <Image source={uploadImage} style={styles.uploadImage}/>
                              
                            </View>
                            
                            
                            
                            </TouchableHighlight>
                            </Right>
                            
                        </ListItem>

        
)}


              </List>
            
            
 
 
 
 
 
 {renderIf(this.state.currently_employed == true && (this.state.applicant_salary_slip_uploaded=='false' || this.state.applicant_salary_slip_uploaded==null || this.state.applicant_form_16_uploaded=='false' || this.state.applicant_form_16_uploaded==null || this.state.applicant_office_id_uploaded=='false' || this.state.applicant_office_id_uploaded==null),  
             <ListItem>
                    <View><Text style={{textDecorationLine:'underline',fontSize:15}}>Applicant Profession Documents</Text></View>
              </ListItem>
              )}
 
         {renderIf(this.state.currently_employed,
             <List style={styles.ProfileMainView} style={{marginLeft:5}}>     
                   
                   
                   {renderIf(this.state.applicant_salary_slip_uploaded=='false' || this.state.applicant_salary_slip_uploaded==null, 
                        <ListItem style={{marginLeft:10}}>
                         <Left>
                           <View style={styles.inlinecss}>
                           
                            <Text style={styles.DocumentFont1}>Salary slip</Text>
                         </View>
                            </Left>
                            <Right>
                            
                            <TouchableHighlight  onPress={() =>  this.props.navigation.navigate("Applicantprofessionalform")} underlayColor="white">
                            <View iconRight success style={styles.inlinecss}>

                              <Text style={styles.DocumentFont2}>Upload</Text>
                              <Image source={uploadImage} style={styles.uploadImage}/>
                            </View>
                            </TouchableHighlight>
                            
                          
                            
                            </Right>
                            
                            
                        </ListItem>
                        
                        )}
                        
                        
                        {renderIf(this.state.applicant_form_16_uploaded=='false' || this.state.applicant_form_16_uploaded==null, 

                        <ListItem style={{marginLeft:10}}>
                         <Left>
                           <View style={styles.inlinecss}>
                            <Text style={styles.DocumentFont1}>Form 16</Text>
                           
                            </View>
                            </Left>
                            <Right>
                            
                            <TouchableHighlight  onPress={() =>  this.props.navigation.navigate("Applicantprofessionalform")} underlayColor="white">
                            <View iconRight success style={styles.inlinecss}>

                              <Text style={styles.DocumentFont2}>Upload</Text>
                              <Image source={uploadImage} style={styles.uploadImage}/>
                            </View>
                             </TouchableHighlight>
                             
                            </Right>
                        </ListItem>
                        
                        )}
                        

{renderIf(this.state.applicant_office_id_uploaded=='false' || this.state.applicant_office_id_uploaded==null, 
                        <ListItem style={{marginLeft:10}}>
                         <Left>
                           <View style={styles.inlinecss}>
                            <Text style={styles.DocumentFont1}>ID Card</Text>
               
                            </View>
                            </Left>
                            <Right>
                            
                            <TouchableHighlight  onPress={() =>  this.props.navigation.navigate("Applicantprofessionalform")} underlayColor="white">
                            <View iconRight success style={styles.inlinecss}>

                              <Text style={styles.DocumentFont2}>Upload</Text>
                             <Image source={uploadImage} style={styles.uploadImage}/>
                            
                           
                            
                            </View>
                             </TouchableHighlight>
                            
                             
                            
                            </Right>
                        </ListItem>
                        
                        )}

                        
        </List>  
     
     )}




            
            
              <List style={styles.ProfileMainView} style={{borderTopWidth:0}}>
                  
             {renderIf(this.state.coapplicant_pan_card_uploaded==null || this.state.coapplicant_adhar_card_uploaded==null || this.state.coapplicant_pan_card_uploaded=='false' || this.state.coapplicant_adhar_card_uploaded=='false',
             <ListItem style={{marginLeft:20}}>
                    <View style={styles.inlinecss}><Text style={{textDecorationLine:'underline',fontSize:15}}>Co-Applicant KYC</Text></View>
              </ListItem>
                )}


                   {renderIf(this.state.coapplicant_adhar_card_uploaded==null || this.state.coapplicant_adhar_card_uploaded=='false', 

                   <ListItem>
                         <Left>
                           <View  style={styles.inlinecss}>
                           
                            <Text style={styles.DocumentFont1}>Aadhar Card</Text>

                            </View>
                            
                            </Left>
                            <Right>
                            <TouchableHighlight  onPress={() =>  this.props.navigation.navigate("Coapplicantdocform")} underlayColor="white">
                            
                             <View iconRight success style={styles.inlinecss}>

                              <Text style={styles.DocumentFont2}>Upload</Text>
                              
                              <Image source={uploadImage} style={styles.uploadImage}/>
                              
                            </View>
                            
                            </TouchableHighlight>
                            </Right>
                            
                        </ListItem>

                )}

                {renderIf(this.state.coapplicant_pan_card_uploaded==null || this.state.coapplicant_pan_card_uploaded=='false', 

                   <ListItem>
                         <Left>
                           <View  style={styles.inlinecss}>
                           
                            <Text style={styles.DocumentFont1}>Pan Card</Text>

                            </View>
                            
                            </Left>
                            <Right>
                            <TouchableHighlight  onPress={() =>  this.props.navigation.navigate("Coapplicantdocform")} underlayColor="white">
                            
                             <View iconRight success style={styles.inlinecss}>

                              <Text style={styles.DocumentFont2}>Upload</Text>
                              
                              <Image source={uploadImage} style={styles.uploadImage}/>
                              
                            </View>
                            
                            </TouchableHighlight>
                            </Right>
                            
                        </ListItem>

                )}

                


                </List>

 <List style={styles.ProfileMainView} style={{borderTopWidth:0}}>
     
     
     
 {renderIf(  (this.state.coapplicant_form_16_uploaded==null || this.state.coapplicant_form_16_uploaded=='false' || this.state.coapplicant_bank_statement_uploaded==null || this.state.coapplicant_bank_statement_uploaded=='false') && this.state.coapplicant_occupation_status=='salaried' ,
             <ListItem style={{marginLeft:20}}>
                    <View style={styles.inlinecss}><Text style={{textDecorationLine:'underline',fontSize:15}}>Co-Applicant Profession Documents</Text></View>
              </ListItem>
                )}
        
        
  {renderIf( ( this.state.coapplicant_itr_uploaded==null || this.state.coapplicant_itr_uploaded=='false' || this.state.coapplicant_personal_account_statement_uploaded==null || this.state.coapplicant_personal_account_statement_uploaded=='false' || this.state.coapplicant_current_account_statement_uploaded==null || this.state.coapplicant_current_account_statement_uploaded=='false') && this.state.coapplicant_occupation_status=='self-employed',
             <ListItem style={{marginLeft:20}}>
                    <View style={styles.inlinecss}><Text style={{textDecorationLine:'underline',fontSize:15}}>Co-Applicant Profession Documents</Text></View>
              </ListItem>
                )}
        
        
        
 {renderIf(  (  this.state.coapplicant_bank_statement_uploaded==null || this.state.coapplicant_bank_statement_uploaded=='false') && this.state.coapplicant_occupation_status=='pensioner' ,
             <ListItem style={{marginLeft:20}}>
                    <View style={styles.inlinecss}><Text style={{textDecorationLine:'underline',fontSize:15}}>Co-Applicant Profession Documents</Text></View>
              </ListItem>
                )}
        
        

 {renderIf((this.state.coapplicant_form_16_uploaded==null || this.state.coapplicant_form_16_uploaded=='false' ) && this.state.coapplicant_occupation_status=='salaried', 

                   <ListItem>
                         <Left>
                           <View  style={styles.inlinecss}>
                           
                            <Text style={styles.DocumentFont1}>Form 16(Last two years)</Text>

                            </View>
                            
                            </Left>
                            <Right>
                            <TouchableHighlight  onPress={() =>  this.props.navigation.navigate("Coapplicantdocform")} underlayColor="white">
                            
                             <View iconRight success style={styles.inlinecss}>

                              <Text style={styles.DocumentFont2}>Upload</Text>
                              
                              <Image source={uploadImage} style={styles.uploadImage}/>
                              
                            </View>
                            
                            </TouchableHighlight>
                            </Right>
                            
                        </ListItem>

                )}
                {renderIf((this.state.coapplicant_bank_statement_uploaded==null || this.state.coapplicant_bank_statement_uploaded=='false') && this.state.coapplicant_occupation_status !=='self-employed', 

                   <ListItem>
                         <Left>
                           <View  style={styles.inlinecss}>
                           
                            <Text style={styles.DocumentFont1}>Bank Statement(Last 6 Months)</Text>

                            </View>
                            
                            </Left>
                            <Right>
                            <TouchableHighlight  onPress={() =>  this.props.navigation.navigate("Coapplicantdocform")} underlayColor="white">
                            
                             <View iconRight success style={styles.inlinecss}>

                              <Text style={styles.DocumentFont2}>Upload</Text>
                              
                              <Image source={uploadImage} style={styles.uploadImage}/>
                              
                            </View>
                            
                            </TouchableHighlight>
                            </Right>
                            
                        </ListItem>

                )}

                {renderIf((this.state.coapplicant_current_account_statement_uploaded==null || this.state.coapplicant_current_account_statement_uploaded=='false' ) && this.state.coapplicant_occupation_status=='self-employed', 

                   <ListItem>
                         <Left>
                           <View  style={styles.inlinecss}>
                           
                            <Text style={styles.DocumentFont1}>Current account statement (Last 6 months)</Text>

                            </View>
                            
                            </Left>
                            <Right>
                            <TouchableHighlight  onPress={() =>  this.props.navigation.navigate("Coapplicantdocform")} underlayColor="white">
                            
                             <View iconRight success style={styles.inlinecss}>

                              <Text style={styles.DocumentFont2}>Upload</Text>
                              
                              <Image source={uploadImage} style={styles.uploadImage}/>
                              
                            </View>
                            
                            </TouchableHighlight>
                            </Right>
                            
                        </ListItem>

                )}
                 {renderIf((this.state.coapplicant_personal_account_statement_uploaded==null || this.state.coapplicant_personal_account_statement_uploaded=='false') && this.state.coapplicant_occupation_status=='self-employed', 

                   <ListItem>
                         <Left>
                           <View  style={styles.inlinecss}>
                           
                            <Text style={styles.DocumentFont1}>Personal account statement (Last 6 months)</Text>

                            </View>
                            
                            </Left>
                            <Right>
                            <TouchableHighlight  onPress={() =>  this.props.navigation.navigate("Coapplicantdocform")} underlayColor="white">
                            
                             <View iconRight success style={styles.inlinecss}>

                              <Text style={styles.DocumentFont2}>Upload</Text>
                              
                              <Image source={uploadImage} style={styles.uploadImage}/>
                              
                            </View>
                            
                            </TouchableHighlight>
                            </Right>
                            
                        </ListItem>

                )}


                {renderIf((this.state.coapplicant_itr_uploaded==null || this.state.coapplicant_itr_uploaded=='false') && this.state.coapplicant_occupation_status=='self-employed', 

                   <ListItem>
                         <Left>
                           <View  style={styles.inlinecss}>
                           
                            <Text style={styles.DocumentFont1}>ITR document (2 years)</Text>

                            </View>
                            
                            </Left>
                            <Right>
                            <TouchableHighlight  onPress={() =>  this.props.navigation.navigate("Coapplicantdocform")} underlayColor="white">
                            
                             <View iconRight success style={styles.inlinecss}>

                              <Text style={styles.DocumentFont2}>Upload</Text>
                              
                              <Image source={uploadImage} style={styles.uploadImage}/>
                              
                            </View>
                            
                            </TouchableHighlight>
                            </Right>
                            
                        </ListItem>

                )}

            

</List>

      </Content>
      
       <Footer style={{backgroundColor:'white'}}>
                         <Left style={{paddingLeft:20}}>
                         <TouchableHighlight  onPress={() => Communications.phonecall('+919717277121', true)}>
                          <View style={{justifyContent:'center',alignItems:'center'}}>
                          <Icon name={"ios-call"}  size={30} color="black" />
                      </View>
                      </TouchableHighlight>
                    </Left>
                    
                    
                    <Right style={{paddingRight:20}}>
                    <TouchableHighlight  onPress={() => Linking.openURL('whatsapp://send?text=hi&phone=+919717277121')}>
                         <View style={{justifyContent:'center',alignItems:'center'}}>
                             <Icon name={"logo-whatsapp"}  size={30} color="#43D854" />
                          </View>
                          </TouchableHighlight>
                    </Right> 
       
        </Footer>
      
      
      
      </Container>
);
                }
            }
            


    
    
export default Profile;
