import React, { Component } from "react";
import { View ,Platform,AsyncStorage, KeyboardAvoidingView,Alert ,TouchableHighlight ,BackHandler,ToastAndroid, Keyboard, TouchableWithoutFeedback, ScrollView,NetInfo } from 'react-native';
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



import styles from "./styles";
const drawerImage = require("../../../img/bitmap.png");
const uploadImage = require("../../../img/upload-button.png");

import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
//import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

//import Exponent, { DocumentPicker, Constants, ImagePicker, registerRootComponent,FileSystem } from 'expo';
import {  Image } from 'react-native';

import renderIf from './renderIf';

var ImagePicker = require('react-native-image-picker');
const personImage = require("../../../img/persion.png");

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'file', title: 'Select'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};



var BUTTONS = [
  { text: "Open Camera", icon: "camera", iconColor: "#2c8ef4" },
  { text: "Image", icon: "image", iconColor: "#f42ced" },
//  {text: "Documents", icon: "document", iconColor: "#f42ced"},
 
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


class Applicantprofessionalform extends Component {
 constructor(props) {
    super(props);

this.state = {  
   
showFooter: true,
      applicant_total_work_experience:'',
      applicant_salary_slip_uploaded:'',
      applicant_form_16_uploaded:'',
      applicant_profile_image:personImage,
      applicant_office_id_uploaded:'',
      currently_employed:true,
      never_employed:false
       
      
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
                this.props.navigation.navigate('Applicantadmissionform');
                return true;
                
             });
    
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
 this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));       
     
  // ASYNC STORAGE TO STATE
await  AsyncStorage.setItem("current_step", 'Applicantprofessionalform');


NetInfo.getConnectionInfo().then((connectionInfo) => {
  
  if(connectionInfo.type == 'none')
  {
    // No Internet
   
var dataKeys = new Array('applicant_contact_no','applicant_total_work_experience','applicant_salary_slip_uploaded','applicant_form_16_uploaded','applicant_office_id_uploaded', 'applicant_profile_image','applicant_occupation');
   
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
else if(key == 'applicant_occupation' )
{
 
 if(value == 'currently_employed')
{
    
  this.setState({"currently_employed": true});
  this.setState({"never_employed": false}); 
}    
    else
    {
    if(value == null)
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
 this.setState({ [key]: value });   
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
 this.setState({ [key]: value });   
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
    if(docAction != undefined){
        if(docAction.text == 'Open Camera')
        {
           this._takePhoto(field); 
            
            
        }
        if(docAction.text == 'Image')
        {
           this._pickImage(field); 
            
            
        }
        
        if(docAction.text == 'Documents')
        {
           this._pickDocument(field); 
            
            
        }
    }   
        
       
  }
     _takePhoto = async (field) => {
     
 ImagePicker.launchCamera(options, (response)  => {
   console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    let source = { uri: response.uri };
console.log('uploading: '+ field);
    // You can also display the image using data:
    // let source = { uri: 'data:image/jpeg;base64,' + response.data };
this._handleImagePicked(source,field);

//    this.setState({
//     field: true
//    });
  }
});
   
   

 //  this._handleImagePicked(pickerResult,field);
   
   
   
  };
  
  

_pickImage = async (field) => {
    // Open Image Library:
ImagePicker.launchImageLibrary(options, (response)  => {
     console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    let source = { uri: 'file://'+response.path };
    
    // You can also display the image using data:
    // let source = { uri: 'data:image/jpeg;base64,' + response.data };
 this._handleImagePicked(source,field);

    
  }  
  
  // Same code as in above section!
});

  };
  
   _pickDocument = async (field) => {

       
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.pdf()],
        },(error,res) => {
      // Android
//      pickerResult=res;
      if(res){
      uploadResponse = this.uploadDocumentAsync(res.uri,field);
      console.log(uploadResponse);
        }
    });
  
  Toast.show({
                text: "Upload Done",
                buttonText: "",
                duration:2000,
                type:"success",
                position:"bottom"
              }); 
              
              if(field == 'applicant_salary_slip')
              {
               this.setState({ applicant_salary_slip_uploaded: "true" });   
              }
               if(field == 'applicant_form_16')
              {
               this.setState({ applicant_form_16_uploaded: "true" });   
              }
              console.log('working1');
               if(field == 'applicant_office_id')
              {
               this.setState({ applicant_office_id_uploaded: "true" });  
               console.log('working');
              }
    await  AsyncStorage.setItem(field+"_uploaded", "true"); 
    
  //  this._handleImagePicked(pickerResult);
	}

  
  _handleImagePicked = async (pickerResult,field) => {
    //let uploadResponse, uploadResult;



    try {
  
      if (pickerResult.uri != undefined) {
          
    // alert(pickerResult.uri);
        uploadResponse = this.uploadImageAsync(pickerResult.uri,field);
     
       
        Toast.show({
                text: "Upload Done",
                buttonText: "",
                duration:2000,
                type:"success",
                position:"bottom"
              }); 
              
              if(field == 'applicant_salary_slip')
              {
               this.setState({ applicant_salary_slip_uploaded: "true" });   
              }
      if(field == 'applicant_form_16')
              {
               this.setState({ applicant_form_16_uploaded: "true" });   
              }
               if(field == 'applicant_office_id')
              {
               this.setState({ applicant_office_id_uploaded: "true" });   
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
       
              if(field == 'applicant_salary_slip')
              {
               this.setState({ applicant_salary_slip_uploaded: "false" });   
              }
      if(field == 'applicant_form_16')
              {
               this.setState({ applicant_form_16_uploaded: "false" });   
              }
               if(field == 'applicant_office_id')
              {
               this.setState({ applicant_office_id_uploaded: "false" });   
              }
      
      await  AsyncStorage.setItem(field+"_uploaded", "false"); 
            
            
    } 
    
  };

uploadImageAsync = async (uri,field) => {
 let apiUrl = global.serverUrl+'/appnew/form/applicant_professional_doc';
    let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];



  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`
    
  });
  formData.append('field',field);
formData.append('applicant_contact_no',this.state.applicant_contact_no);

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
};

await fetch(apiUrl,options)
.then(
(response) => response.text()
) 
.then((responseData) => {      console.log(responseData);    })
.catch((err) => { console.log(err); });


 }

uploadDocumentAsync = async (uri,field) => {
  let apiUrl = global.serverUrl+'/appnew/form/applicant_professional_doc';
    let uriParts = uri.split('.');
  let fileType = uri[uri.length - 1];

app_user_id = await AsyncStorage.getItem('app_user_id');
 borrower_uuid =  await AsyncStorage.getItem('borrower_uuid');
lead_id =  await AsyncStorage.getItem('lead_id');

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.pdf`,
    type: `application/pdf`,
  });
formData.append('applicant_contact_no',this.state.applicant_contact_no);
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
console.log(apiUrl);
console.log(options);
fetch(apiUrl,options)
.then(
(response) => response.text()
) 
.then((responseData) => {      console.log(responseData);    })
.catch((err) => { console.log(err); });


 }


// DOC UPLOAD

  
 _submitFormData = async () =>
 {
  
     
     let formData = {
         applicant_total_work_experience : this.state.applicant_total_work_experience,
        applicant_contact_no:this.state.applicant_contact_no,
        currently_employed:this.state.currently_employed,
      never_employed:this.state.never_employed
         
         
     };
  
 console.log(formData);
        
 var url = global.serverUrl+'/appnew/form/applicant_professional_doc';

await fetch(url, {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify(formData)
})
.then(
(response) => response.text()
) 
.then((responseData) => { 
    
console.log( 'responseData');    
    

    console.log( responseData);
  // arr = JSON.parse(responseData);

return 'success';
    
 })
.catch((err) => { console.log(err); });  
     
  
     
 }


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
if(key == 'applicant_total_work_experience')
{
 this.setState({"applicant_total_work_experience": value}); 
 await  AsyncStorage.setItem("applicant_total_work_experience", value); 
}

if(key == 'applicant_occupation')
{
    
 if(value == 'currently_employed')
{
    
  this.setState({"currently_employed": true});
  this.setState({"never_employed": false}); 
}    
    else
    {
    if(value == null)
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
  
 await  AsyncStorage.setItem("applicant_occupation", value); 
}

 
   
}

_nextStep = async () => {
    
// SUBMIT DATA TO SERVER
formResp = await this._submitFormData();
//console.log(formResp);
// SUBMIT DATA TO SERVER
if(formResp !== 'failed'){
 
this.props.navigation.navigate('Coapplicantdetailform');

}
else
{
    Alert.alert( 'Alert', 'Error Occured' );
}    

	}
        
         _prevStep = async () => {

this.props.navigation.navigate('Applicantadmissionform');
	}

 
  _dataSync = async (applicant_contact_no) =>
 {
  
         if(applicant_contact_no == null)
        {
         
            return 'failed';
        }
    
     let formSubmitObject = {
         
         applicant_contact_no : applicant_contact_no,
        'screen':'Applicantprofessionalform'
          
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
            <Text style={styles.ProgressHeading1}>If you are employed ?</Text>
            <Label style={styles.ProgressHeading2}>Lets us know if you are currently working</Label>
        </View> 
        <View style={{paddingLeft:12, paddingBottom:12}}>
        <Progress.Bar progress={0.6} width={200}  color="#f7a700" borderColor="#2e1e71" backgroundColor="#2e1e71"/>
        </View>
        <Content style={styles.content}>     
           
          
           
         <View>
        
          <Item style={{padding:10}} onPress={() => this.saveData("applicant_occupation",'currently_employed')}>
            
            <Left>
              <Radio  selected={this.state.currently_employed}
            onPress={() => this.saveData("applicant_occupation",'currently_employed')}/>
            <Text style={{fontSize:15, marginLeft:30, marginTop:-20}}>Currently Employed</Text>
            </Left>
           </Item>
        
        
        <Item style={{padding:10}} onPress={() => this.saveData("applicant_occupation",'never_employed')}>
            
            <Left>
              <Radio  selected={this.state.never_employed}
            onPress={() => this.saveData("applicant_occupation",'admitted')}/>
            <Text style={{fontSize:15, marginLeft:30, marginTop:-20}}>Never Employed</Text>
            </Left>
           </Item>
        
        
          {renderIf(this.state.currently_employed,
           <Item floatingLabel style={styles.marginInput}>
            <Label style={styles.level}>Experience (Yrs)</Label>
            <Input keyboardType="numeric" ref= {(el) => { this.applicant_total_work_experience = el; }}
    onChangeText={(applicant_total_work_experience) => this.saveData('applicant_total_work_experience', applicant_total_work_experience)} 
    value={this.state.applicant_total_work_experience} style={styles.InputField}/>
   
          </Item>
          
          )}
          
           
            </View>  
            
            {renderIf(this.state.currently_employed,
             <List style={styles.MarginList}>     
                   
                        <ListItem>
                         <Left>
                           
                            <Text style={styles.DocumentFont1}>Salary slip</Text>
                            {renderIf(this.state.applicant_salary_slip_uploaded=='true', 
                   
                              <View iconRight success style={styles.inlinecss}>
                            <Icon name='ios-checkmark-circle' style={styles.successIcon}/>
                           
                            </View>

                             )}
                     
                           
                            </Left>
                            <Right>
                            
                            <TouchableHighlight  onPress={() =>  this.sheetOpen('applicant_salary_slip')} underlayColor="white">
                            <View iconRight success style={styles.inlinecss}>

                              <Text style={styles.DocumentFont2}>Upload</Text>
                              <Image source={uploadImage} style={styles.uploadImage}/>
                            </View>
                            </TouchableHighlight>
                            
                          
                            
                            </Right>
                            
                            
                        </ListItem>

                        <ListItem>
                         <Left>
                           <View style={styles.inlinecss}>
                            <Text style={styles.DocumentFont1}>Form 16</Text>
                            {renderIf(this.state.applicant_form_16_uploaded=='true', 
                   
                              <View iconRight success style={styles.inlinecss}>
                            <Icon name='ios-checkmark-circle' style={styles.successIcon}/>
                           
                            </View>

                             )}
                            </View>
                            </Left>
                            <Right>
                            
                            <TouchableHighlight  onPress={() =>  this.sheetOpen('applicant_form_16')} underlayColor="white">
                            <View iconRight success style={styles.inlinecss}>

                              <Text style={styles.DocumentFont2}>Upload</Text>
                              <Image source={uploadImage} style={styles.uploadImage}/>
                            </View>
                             </TouchableHighlight>
                             
                         
                            
                            </Right>
                        </ListItem>

                        <ListItem>
                         <Left>
                           <View style={styles.inlinecss}>
                            <Text style={styles.DocumentFont1}>ID Card</Text>
                             {renderIf(this.state.applicant_office_id_uploaded=='true', 
                   
                              <View iconRight success style={styles.inlinecss}>
                            <Icon name='ios-checkmark-circle' style={styles.successIcon}/>
                           
                            </View>

                             )}
                            </View>
                            </Left>
                            <Right>
                            
                            <TouchableHighlight  onPress={() =>  this.sheetOpen('applicant_office_id')} underlayColor="white">
                            <View iconRight success style={styles.inlinecss}>

                              <Text style={styles.DocumentFont2}>Upload</Text>
                             <Image source={uploadImage} style={styles.uploadImage}/>
                            
                           
                            
                           
                            
                            </View>
                             </TouchableHighlight>
                            
                             
                            
                            </Right>
                        </ListItem>

                        
        </List>  
     
     )}
     
      
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
            


    
    
export default Applicantprofessionalform;
