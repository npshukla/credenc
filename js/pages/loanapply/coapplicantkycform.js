import React, { Component } from "react";
import { View ,Platform,AsyncStorage, KeyboardAvoidingView,TouchableHighlight ,BackHandler,ToastAndroid, Keyboard, TouchableWithoutFeedback, ScrollView} from 'react-native';
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
  List,
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

import styles from "./styles";

const drawerImage = require("../../../img/bitmap.png");
const successImage = require("../../../img/success.png");
const deleteImage = require("../../../img/delete.png");
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

const DismissKeyboard=({ children })=> (
  <TouchableWithoutFeedback onPress = {()=>Keyboard.dismiss()}>
  {children}
  </TouchableWithoutFeedback>
);



class Coapplicantkycform extends Component {
 constructor(props) {
    super(props);

this.state = {  
      applicant_full_name: '',
      applicant_contact_no: '',
      applicant_current_city: '',
      applicant_occupation: 'applicant',
      
      showCustomerImage:true,
      applicant_profile_image:'none',
      customer_admitin:true
      
     
      
    };

console.debug('startup');

  } 
  
  
async componentDidMount() {
     
  //ASYNC STORAGE TO STATE       
this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {


                if (this.lastBackButtonPress + 2000 >= new Date().getTime()) {
                    BackHandler.exitApp();
                    return true;
                }
                // ToastAndroid.show('Press again to exit :)', ToastAndroid.SHORT);
                this.lastBackButtonPress = new Date().getTime();
                this.props.navigation.navigate('Coapplicantdetailform');
                return true;
                
             });

await  AsyncStorage.setItem("previous_step", 'Coapplicantdetailform');
await  AsyncStorage.setItem("current_step", 'Coapplicantkeyform');
await  AsyncStorage.setItem("next_step", 'Coapplicantdocform');

AsyncStorage.getAllKeys((err, keys) => {  AsyncStorage.multiGet(keys, (err, stores) => 
    { stores.map((result, i, store) => {  
            

let key = store[i][0]; 

let value = store[i][1];

this.setState({ [key]: value });


                });
            });
        });
  
 
  // ASYNC STORAGE TO STATE 

   if(await  AsyncStorage.getItem("coapplicant_kyc_step") !== 'complete')
 {
    await  AsyncStorage.setItem("coapplicant_kyc_step","partial_complete");
 }


  }
  
 async componentWillUnmount()  
{
    
 this.backButtonListener.remove();   
    
    
} 
  
 
 _getFormData = async () =>
 {
     console.log(this.state);
     
     applicant_full_name = await AsyncStorage.getItem("applicant_full_name"); 

console.log(applicant_full_name);
     
 }
 
 

 // DOC UOLOAD
 
 sheetOpen = async (field) => {
     
 console.log(field);
    ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "Upload"
                
              },
              buttonIndex => {
                this.docUpload(BUTTONS[buttonIndex],field);
              }
            ) 
     
 }
 
 docUpload(docAction,field) {
    console.log(docAction.text);
        if(docAction.text == 'Open Camera')
        {
           this._takePhoto(field); 
            
            
        }
        if(docAction.text == 'Image')
        {
           this._pickImage(field); 
            
            
        }
        
        if(docAction.text == 'Doc')
        {
           this._pickDocument(field); 
            
            
        }
       
  }
    
 _takePhoto = async (field) => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });
   
   

   this._handleImagePicked(pickerResult,field);
  };

  _pickImage = async (field) => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult,field);
  };
  
   _pickDocument = async (field) => {
	    let pickerResult = await DocumentPicker.getDocumentAsync({
                type:'application/pdf'
                
            });
	
  //  alert(pickerResult.uri);    
       
 
  uploadResponse = this.uploadDocumentAsync(pickerResult.uri,field);
  Toast.show({
                text: "Upload Done",
                buttonText: "",
                duration:2000,
                type:"success",
                position:"bottom"
              }); 
              
              if(field == 'coapplicant_pan')
              {
               this.setState({ coapplicant_pan_uploaded: "true" });   
              }
      if(field == 'coapplicant_aadhar')
              {
               this.setState({ coapplicant_aadhar_uploaded: "true" });   
              }
               
    await  AsyncStorage.setItem(field+"_uploaded", "true"); 
    console.log(field);               
  
        console.log(uploadResponse);
  //  this._handleImagePicked(pickerResult);
	}

  
  _handleImagePicked = async (pickerResult,field) => {
    let uploadResponse, uploadResult;

    try {
      

 await  AsyncStorage.setItem(field, pickerResult.uri); 
      if (pickerResult.uri != undefined) {
          
    // alert(pickerResult.uri);
        uploadResponse = this.uploadImageAsync(pickerResult.uri,field);
      //  uploadResult = await uploadResponse.json();
       // this.setState({ image: uploadResult.location });
        console.log(uploadResponse);
        // console.log(uploadResult);
        Toast.show({
                text: "Upload Done",
                buttonText: "",
                duration:2000,
                type:"success",
                position:"bottom"
              }); 
              
              if(field == 'coapplicant_pan')
              {
               this.setState({ coapplicant_pan_uploaded: "true" });   
              }
      if(field == 'coapplicant_aadhar')
              {
               this.setState({ coapplicant_aadhar_uploaded: "true" });   
              }
               
    await  AsyncStorage.setItem(field+"_uploaded", "true"); 
    console.log(field);          
              
      }
    } catch (e) {
      
      
       Toast.show({
                text: "Upload Failed",
                buttonText: "",
                duration:2000,
                type:"danger",
                position:"bottom"
              });
       
            if(field == 'coapplicant_pan')
              {
               this.setState({ coapplicant_pan_uploaded: "false" });   
              }
      if(field == 'coapplicant_aadhar')
              {
               this.setState({ coapplicant_aadhar_uploaded: "false" });   
              }
      
      await  AsyncStorage.setItem(field+"_uploaded", "false"); 
            
            
    }
    
  };

 uploadImageAsync = async (uri,field) => {
 let apiUrl = 'http://192.168.1.18/appnew/form/coapplicant_kyc';
    let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

app_user_id = await AsyncStorage.getItem('app_user_id');
 borrower_uuid =  await AsyncStorage.getItem('borrower_uuid');
lead_id =  await AsyncStorage.getItem('lead_id');

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`
    
  });
formData.append('app_user_id',app_user_id);
formData.append('borrower_uuid',borrower_uuid);
formData.append('lead_id',lead_id);
formData.append('field',field);
  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
};

fetch(apiUrl,options)
.then(
(response) => response.text()
) 
.then((responseData) => {      console.debug(responseData);    })
.catch((err) => { console.log(err); });


 }

uploadDocumentAsync = async (uri,field) => {
  let apiUrl = 'http://192.168.1.18/appnew/form/coapplicant_kyc';
    let uriParts = uri.split('.');
  let fileType = uri[uri.length - 1];
console.log('IN');
app_user_id = await AsyncStorage.getItem('app_user_id');
 borrower_uuid =  await AsyncStorage.getItem('borrower_uuid');
lead_id =  await AsyncStorage.getItem('lead_id');

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.pdf`,
    type: `application/pdf`,
  });
formData.append('app_user_id',app_user_id);
formData.append('borrower_uuid',borrower_uuid);
formData.append('lead_id',lead_id);
formData.append('field',field);


  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
};

fetch(apiUrl,options)
.then(
(response) => response.text()
) 
.then((responseData) => {      console.log(responseData);    })
.catch((err) => { console.log(err); });


 }

// DOC UPLOAD





  handlePress(ref) {
      
  console.log(this.form.getData());    
  
  var url = 'http://192.168.0.103/test.php';

fetch(url, {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify(this.form.getData())
})
.then(
(response) => response.text()
) 
.then((responseData) => { console.log("response: " + responseData); })
.catch((err) => { console.log(err); });
  

}

async saveData(key,value)
{
if(key == 'applicant_full_name')
{
 this.setState({"applicant_full_name": value}); 
 await  AsyncStorage.setItem("applicant_full_name", value); 
}
if(key == 'customer_admitin')
{
 this.setState({"customer_admitin": value}); 
 await  AsyncStorage.setItem("customer_admitin", value); 
}

    
   
}



_nextStep = async () => {
    
await  AsyncStorage.setItem("coapplicant_kyc_step", 'complete');
next_step = await  AsyncStorage.getItem("next_step");
this.props.navigation.navigate(next_step);
	}
        
 _prevStep = async () => {

previous_step = await  AsyncStorage.getItem("previous_step");
this.props.navigation.navigate(previous_step);
	}
        
    
    

render() {
    
    
    let { image } = this.state.applicant_profile_image;
    

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
   <Icon name={"ios-person"}  size={30} color="#01a699" />
 </View>
          </Right>
         
        </Header>

        <ActionSheet ref={(c) => { ActionSheet.actionsheetInstance = c; }} />
        <View style={styles.profileheading} style={{paddingBottom:5}}>
            <Text style={styles.ProgressHeading1}>Lets get you started on your application</Text>
            <Label style={styles.ProgressHeading2}>Upload your persional ID's and document to begin</Label>
        </View> 
        <View style={{paddingLeft:12, paddingBottom:12}}>
        <Progress.Bar progress={0.3} width={200}  color="#f7a700" borderColor="#2e1e71" backgroundColor="#2e1e71"/>
        </View>
        <Content style={styles.content}>     
            
                   <List>
                         <ListItem>
                         <Left>
                           <View iconRight success style={styles.inlinecss}>
                            <Text style={styles.DocumentFont1}>Upload Pancard</Text>
                            <View iconRight success style={styles.inlinecss}>
                            <Icon name='ios-checkmark-circle' style={styles.successIcon1}/>
                            <Text note>Img_pancard.pdf</Text>
                            </View>
                            </View>
                            </Left>
                            <Right>
                            <View iconRight success style={styles.inlinecss}>
                              <Text style={styles.DocumentFont2}>Delete</Text>
                              <Icon name='ios-close-circle' style={styles.CrossIcon}/>
                            </View>
                            </Right>
                        </ListItem>

                        <ListItem>
                         <Left>
                           <View iconRight success style={styles.inlinecss}>
                            <Text>Upload Pancard</Text>
                            <View iconRight success style={styles.inlinecss}>
                            <Icon name='ios-checkmark-circle' style={styles.successIcon1}/>
                            <Text note>Img_pancard.pdf</Text>
                            </View>
                            </View>
                            </Left>
                            <Right>
                            <View iconRight success style={styles.inlinecss}>
                              <Text>Delete</Text>
                              <Icon name='ios-close-circle' style={styles.CrossIcon}/>
                            </View>
                            </Right>
                        </ListItem>

                        <ListItem>
                         <Left>
                           <View>
                            <Text>Upload Adharcard</Text>
                            
                            </View>
                            </Left>
                            <Right>
                            <View iconRight success style={styles.inlinecss}>

                              <Text style={{color:'#00C497'}}>Upload</Text>
                              <Icon name='ios-arrow-dropup-circle' style={styles.successIcon}/>
                            </View>
                            </Right>
                        </ListItem>

                        
        </List>
  
      
      </Content>
      
      
  <Footer style={{backgroundColor:'white'}}>
                         <Left style={{paddingLeft:12}}>
                        <Button half onPress={this._prevStep} style={{borderRadius:30, backgroundColor:'white', width:100, alignItems:'center', justifyContent:'center', height:40}}>
                            <Text style={{color:'black'}}>Back</Text>
                        </Button>
                    </Left>
                    
                    <Right style={{paddingRight:12}}>
                        <Button half onPress={this._nextStep} style={{borderRadius:30,width:100, backgroundColor:'#f7a700', alignItems:'center', justifyContent:'center', height:40}}>
                            <Text>Next</Text>
                        </Button>
                    </Right>
       
        </Footer>
      
      
      </LinearGradient>
      </DismissKeyboard>
);
                }
            }
            


    
    
export default Coapplicantkycform;
