import React, { Component } from "react";
import { View ,Platform,AsyncStorage, KeyboardAvoidingView , Image,TouchableHighlight,BackHandler,ToastAndroid,NetInfo} from 'react-native';
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
    Card, 
    CardItem,
    List,
    Root
  
 
//  Form,
  
} from "native-base";

import Communications from 'react-native-communications';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';

import styles from "./styles";

const drawerImage = require("../../../img/bitmap.png");
const successImage = require("../../../img/check.png");
const personImage = require("../../../img/persion.png");



class Loanapplystart extends Component {
 constructor(props) {
    super(props);

    this.state = { 
         applicant_profile_image:personImage
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

                this.props.navigation.navigate('Coapplicantdocform');

                return true;
                
             });
   

    await  AsyncStorage.setItem("application_complete","complete");

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
  
 
 _getFormData = async () =>
 {
     console.log(this.state);
     
     applicant_full_name = await AsyncStorage.getItem("applicant_full_name"); 

console.log(applicant_full_name);
     
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


async  nextCard(step) 
 {
   console.log(this.state.basic_detail_step); 
 console.log(step);   
    
 }



_dataSync = async (applicant_contact_no) =>
 {
  
         if(applicant_contact_no == null)
        {
         
            return 'failed';
        }
    
     let formSubmitObject = {
         
         applicant_contact_no : applicant_contact_no,
        'screen':'Loanapplicationsuccessful'
          
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
        <Content>
        <View style={{backgroundColor:'white'}}>
        <Image source={{drawerImage}} style={{height:100, width:100}}/>
        </View>

          <View style={{justifyContent: 'center',alignItems: 'center', marginTop:100}}>
              <Image source={successImage} />
            <Text style={{color:'white', paddingTop:10, paddingBottom:10}}> Congratulations </Text>
            <Progress.Bar progress={1} width={200}  color="#f7a700" borderColor="#2e1e71" backgroundColor="#2e1e71" />
       
            <Text style={{color:'white',fontSize:12, paddingTop:10}}>Your loan application has been submitted with us.</Text>
            <Text style={{color:'white', fontSize:12, paddingLeft:10, paddingRight:10, textAlign:'center'}}>Get continuous update on status of your application on the<Text style={{textDecorationLine:'underline', fontSize:12, color:'#fff',paddingBottom:10}}  onPress={() => this.props.navigation.navigate("Profile")}> profile page</Text></Text>
                                            
                                            
                                            
                                            
       
        <View>
        

        </View>



          </View>
        </Content>
      
         <Footer style={{backgroundColor:'#3F51B5'}}>
                         <Left style={{paddingLeft:12}}>
                        <Button half onPress={() => Communications.phonecall('+919717277121', true)} style={{backgroundColor:'#3F51B5', alignItems:'center', justifyContent:'center', height:40,elevation: 0 ,shadowOpacity: 0, borderWidth:0}}>
                            <Text style={{fontSize:13}}>Call Loan Experts</Text>
                        </Button>
                    </Left>

                    <Right style={{paddingRight:12}}>
                        <Button half style={{backgroundColor:'#3F51B5', alignItems:'center', justifyContent:'center', height:40, elevation: 0 ,shadowOpacity: 0, borderWidth:0}}  onPress={() => this.props.navigation.navigate("Profile")}>
                            <Text style={{fontSize:13}}>Profile</Text>
                        </Button>
                    </Right>
       
        </Footer>
      
      
      
     </LinearGradient>

);
                }
            }
            


    
    
export default Loanapplystart;
