import React, { Component } from "react";
import { View ,Platform,AsyncStorage, KeyboardAvoidingView , TouchableHighlight,BackHandler,ToastAndroid,  Keyboard, TouchableWithoutFeedback, ScrollView , NetInfo } from 'react-native';
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
   Root,
  Toast
 
//  Form,
  
} from "native-base";



import styles from "./styles";

const drawerImage = require("../../../img/bitmap.png");
const applicant_profile_image_default = require("../../../img/persion.png");
const cameraImage = require("../../../img/camara.png");



// import Exponent, { DocumentPicker, Constants, ImagePicker, registerRootComponent,FileSystem } from 'expo';
import {  Image } from 'react-native';


var ImagePicker = require('react-native-image-picker');
import LinearGradient from 'react-native-linear-gradient';

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
//  { text: "Doc", icon: "document", iconColor: "#ea943b" },
 
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




class Customerimageform extends Component {
 constructor(props) {
    super(props);

this.state = {  
      
      applicant_contact_no: '',
      
      showCustomerImage:true,
      applicant_profile_image:applicant_profile_image_default
      
      
     
      
    };

console.debug('startup');

  } 
  
  
     async componentDidMount() {
     
  this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {


                if (this.lastBackButtonPress + 2000 >= new Date().getTime()) {
                    BackHandler.exitApp();
                    return true;
                }
                // ToastAndroid.show('Press again to exit :)', ToastAndroid.SHORT);
                this.lastBackButtonPress = new Date().getTime();
                this.props.navigation.navigate('Loanapplystart');
                return true;
                
             });

//AsyncStorage.removeItem("applicant_profile_image")
await  AsyncStorage.setItem("current_step", 'Customerimageform');


// NEW CODE 
NetInfo.getConnectionInfo().then((connectionInfo) => {
  
  if(connectionInfo.type == 'none')
  {
    // No Internet
var dataKeys = new Array('applicant_contact_no', 'applicant_profile_image');
   
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
  
this.setState({ [key]: value });

 
 
 
}



                });
            });
      
  // ASYNC STORAGE TO STATE 
  
  
                       
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
//if(key == 'applicant_profile_image')
//{
//    
//
//if(value != null){
//let source = { uri: value };    
// this.setState({ [key]: source }); 
// }   
//}

                });
            });
      
  // ASYNC STORAGE TO STATE  
  
    
      
  }
  
});



// NEW CODE
            
            
            
            

  }
  
  
  
   async componentWillUnmount()  
{
    
 this.backButtonListener.remove();   
    
    
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
        
        if(docAction.text == 'Doc')
        {
           this._pickDocument(field); 
            
            
        }
        
        }  
       
  }

  cameraOpen = async (field) =>{
    this._takePhoto();
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
    console.log('source');
console.log(source);
    // You can also display the image using data:
    // let source = { uri: 'data:image/jpeg;base64,' + response.data };
this._handleImagePicked(source,field);

    this.setState({
     applicant_profile_image: source
    });
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
console.log('uploading: '+ field);
    // You can also display the image using data:
    // let source = { uri: 'data:image/jpeg;base64,' + response.data };
this._handleImagePicked(source,field);

    this.setState({
     applicant_profile_image: source
    });
  }  
  
  // Same code as in above section!
});

  };
  
   _pickDocument = async (field) => {
      let pickerResult = await DocumentPicker.getDocumentAsync({
                type:'application/pdf'
                
            });
  
  //  alert(pickerResult.uri);    
       
 
  uploadResponse = this.uploadDocumentAsync(pickerResult.uri,field);
       
  
        console.log(uploadResponse);
  //  this._handleImagePicked(pickerResult);
  }

  
  _handleImagePicked = async (pickerResult,field) => {
      
     
      
  
   // let uploadResponse, uploadResult;

    try {
     
//this.setState({ applicant_profile_image: pickerResult.uri });
console.log('before save');
console.log(pickerResult);
 await  AsyncStorage.setItem("applicant_profile_image", pickerResult.uri); 
  
      if (pickerResult.uri != undefined) {
      console.log('handle image1' + pickerResult.uri);     
    // alert(pickerResult.uri);
      var  uploadResponse = this.uploadImageAsync(pickerResult.uri,field);
      //  uploadResult = await uploadResponse.json();
       // this.setState({ image: uploadResult.location });
       
//        Toast.show({
//                text: "Upload Done",
//                buttonText: "",
//                duration:2000,
//                type:"success",
//                position:"bottom"
//              }); 

    //this.setState({ applicant_profile_image_uploaded: "true" }); 
    //await  AsyncStorage.setItem("applicant_profile_image_uploaded", "true"); 
              
              
      }
    } catch (e) {
        
     console.log('failed');    
    

      
//       Toast.show({
//                text: "Upload Failed",
//                buttonText: "",
//                duration:2000,
//                type:"danger",
//                position:"bottom"
//              });
              
    } finally {
     // this.setState({ applicant_profile_image_uploaded: "false" });
     // await  AsyncStorage.setItem("applicant_profile_image_uploaded", "false"); 
      
      
    }
    
  };

 uploadImageAsync = async (uri,field) => {
     
 
  let apiUrl = global.serverUrl+'/appnew/form/applicant_image';
    let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

console.log('upload data start');
applicant_contact_no = this.state.applicant_contact_no;
//applicant_contact_no = '9999011283';
 console.log(applicant_contact_no);
 

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `customerProfile.${fileType}`,
    type: `image/${fileType}`
    
  });
//  console.log(formData);
//  console.log(uri);
//console.log(fileType);
//console.log(field);
formData.append('applicant_contact_no',applicant_contact_no);
//formData.append('borrower_uuid',borrower_uuid);
//formData.append('lead_id',lead_id);
  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
};
console.log('uploading...');
fetch(apiUrl,options)
.then(
(response) => response.text()
) 
.then((responseData) => {   
    console.log('hello');
 console.log(responseData);
  })
.catch((err) => { 
    
console.log(err);
   });


 }

uploadDocumentAsync = async (uri,field) => {
  let apiUrl = 'http://192.168.1.18/appnew/form/applicant_image';
    let uriParts = uri.split('.');
  let fileType = uri[uri.length - 1];
console.log(fileType);
  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.pdf`,
    type: `application/pdf`,
  });
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








 _nextStep = async () => {


this.props.navigation.navigate('Customeradmitform');


  }
        
        
 _prevStep = async () => {




this.props.navigation.navigate('Loanapplystart');
  } 
        
  
_dataSync = async (applicant_contact_no) =>
 {
  
         if(applicant_contact_no == null)
        {
         
            return 'failed';
        }
    
     let formSubmitObject = {
         
         applicant_contact_no : applicant_contact_no,
        'screen':'Customerimageform'
          
     };
   
      
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
   // console.log("prop: " + prop + " value: " + arr[prop]);


    
  }
}  
    
    
}




    
 })
.catch((err) => { console.log(err); });  
     
 }    
    
    
    
    
    

render() {
    
    
   // let { image } = this.state.applicant_profile_image;
    

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
        <View style={styles.profileheading}>
            <Text style={styles.ProgressHeading1}>Let's get you onboarded</Text>
            <Label style={styles.ProgressHeading2}>Upload a selfie</Label>
        </View> 

        <Content style={styles.content}> 
 
  
       <View style={{ alignItems:'center',justifyContent:'center'}}>  
        
       <TouchableHighlight  onPress={() =>  this.cameraOpen('applicant_profile_image')  } underlayColor="white">
         <View
   style={{
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:200,
       height:200,
       marginBottom:100,
       top:80,
       backgroundColor:'#fff',
       borderRadius:200,
     }} 
 >
   <Image source={this.state.applicant_profile_image} style={styles.perImg}/>
 </View>
 </TouchableHighlight>

<TouchableHighlight  onPress={() =>  this.cameraOpen('applicant_profile_image')  } underlayColor="white">
<Item style={{borderBottomWidth:0}} onPress={() =>  this.sheetOpen('applicant_profile_image')  }><Image source={cameraImage} style={styles.cameraImg}/><Text style={{fontSize:13}}>Take Picture</Text></Item>
</TouchableHighlight> 
   
                                    
                                    </View> 

      </Content>
   

                      
      
  <Footer style={{backgroundColor:'white'}}>
                         <Left style={{paddingLeft:12}}>
                        <Button half onPress={this._prevStep} style={{borderRadius:30,backgroundColor:'white', width:100, alignItems:'center', justifyContent:'center', height:40}}>
                            <Text style={{color:'black'}}>Back</Text>
                        </Button>
                    </Left>
                    
                    <Right style={{paddingRight:12}}>
                        <Button half onPress={this._nextStep} style={{borderRadius:30,width:100,backgroundColor:'#f7a700', alignItems:'center', justifyContent:'center', height:40}}>
                            <Text>Next</Text>
                        </Button>
                    </Right>
       
        </Footer>
      
      
      </LinearGradient>
      </DismissKeyboard>
);
                }
            }
            


    
    
export default Customerimageform;
