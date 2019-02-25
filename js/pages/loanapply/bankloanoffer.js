import React, { Component } from "react";
import { View ,Platform,AsyncStorage, KeyboardAvoidingView,Alert ,TouchableHighlight,StyleSheet,BackHandler,ToastAndroid, Keyboard, TouchableWithoutFeedback, ScrollView,NetInfo } from 'react-native';
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
  Card,
  List,
   ListItem,
   Text,
   Radio,
   CheckBox,
   Picker,
   ActionSheet,
   Toast,
   Root
//  Form,

} from "native-base";

import styles from "./styles";
const drawerImage = require("../../../img/bitmap.png");
const credilaImage = require("../../../img/bank/credila-logo.jpg");
const avanseImage = require("../../../img/bank/avanse-logo.png");
const incredImage = require("../../../img/bank/incred-logo.png");
const axisImage = require("../../../img/bank/axis-logo.png");
const auxiloImage = require("../../../img/bank/auxilo.png");
const mpowerImage = require("../../../img/bank/m_power_financing.png");

const personImage = require("../../../img/persion.png");

import * as Progress from 'react-native-progress';

import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';


import Slider from "react-native-slider";

//import Exponent, { DocumentPicker, Constants, ImagePicker, registerRootComponent,FileSystem } from 'expo';
import {  Image } from 'react-native';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

// Keyboard dismiss
const DismissKeyboard=({ children })=> (
  <TouchableWithoutFeedback onPress = {()=>Keyboard.dismiss()}>
  {children}
  </TouchableWithoutFeedback>
);



function  currencyConverter(value)
{

    value=value.toString().replace(/\,/g,"");
var lastThree = value.substring(value.length-3);
var otherNumbers = value.substring(0,value.length-3);
if(otherNumbers != '')
    lastThree = ',' + lastThree;
var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

return res;

}


class Bankloanoffer extends Component {
 constructor(props) {
    super(props);

this.state = {
      incred:false,
      avanse_bank:false,
      credila:false,
      axis_bank:false,
      auxilo:false,
      mpower_financing:false,
      applicant_profile_image:personImage,
      applicant_contact_no:'',
      visible: true,
      applicant_loan_amount:10000,
      value:10000,
      applicant_bank_select:''



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
                this.props.navigation.navigate('Customeradmitform');
                return true;

             });



// ASYNC STORAGE TO STATE
await  AsyncStorage.setItem("current_step", 'Bankloanoffer');


  // NEW CODE
NetInfo.getConnectionInfo().then((connectionInfo) => {

  if(connectionInfo.type == 'none')
  {
    // No Internet
var dataKeys = new Array('applicant_contact_no', 'applicant_profile_image','applicant_loan_amount','applicant_bank_select');

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
if(key == 'applicant_loan_amount')
{

if(value != null){
this.setState({ [key]: parseInt(value) });
this.setState({ value : parseInt(value) });
}
console.log("loan amount"+value);
this._loanOfferData();
}
else
{
 this.setState({ [key]: value });

}

if(key == 'applicant_bank_select')
{
if(value != null)
{
    if(value.indexOf('incred') !== -1)
    {
     this.setState({ incred: true });


    }
    if(value.indexOf('avanse_bank') !== -1)
    {
     this.setState({ avanse_bank: true });


    }
    if(value.indexOf('credila') !== -1)
    {
     this.setState({ credila: true });


    }
    if(value.indexOf('axis_bank') !== -1)
    {
     this.setState({ axis_bank: true });


    }
    if(value.indexOf('auxilo') !== -1)
    {
     this.setState({ auxilo: true });


    }
    if(value.indexOf('mpower_financing') !== -1)
    {
     this.setState({ mpower_financing: true });


    }

                        }

}



}


                });
            });



  }
  else
  {
    // Internet

var dataKeys = new Array('applicant_contact_no', 'applicant_profile_image','applicant_bank_select');

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
if(key == 'applicant_loan_amount')
{

if(value != null){
this.setState({ [key]: parseInt(value) });
this.setState({ value : parseInt(value) });
}
console.log("loan amount"+value);
this._loanOfferData();
}
else
{
 this.setState({ [key]: value });

}

}



if(key == 'applicant_bank_select')
{
if(value != null)
{
    if(value.indexOf('incred') !== -1)
    {
     this.setState({ incred: true });


    }
    if(value.indexOf('avanse_bank') !== -1)
    {
     this.setState({ avanse_bank: true });


    }
    if(value.indexOf('credila') !== -1)
    {
     this.setState({ credila: true });


    }
    if(value.indexOf('axis_bank') !== -1)
    {
     this.setState({ axis_bank: true });


    }
    if(value.indexOf('auxilo') !== -1)
    {
     this.setState({ auxilo: true });


    }
    if(value.indexOf('mpower_financing') !== -1)
    {
     this.setState({ mpower_financing: true });


    }

                        }

}




                });
            });



  }

});



// NEW CODE




//console.log('start');
//await this._loanOfferData();


// FETCH ALL LOAN OFFERS


  }


  async componentWillUnmount()
{

 this.backButtonListener.remove();


}




 _submitFormData = async () =>
 {

     console.log('form submit');

applicant_contact_no = this.state.applicant_contact_no;

     let formData = {
         applicant_contact_no:applicant_contact_no,
         incred:this.state.incred,
      avanse_bank:this.state.avanse_bank,
      credila:this.state.credila,
      axis_bank:this.state.axis_bank,
      auxilo:this.state.auxilo,
      mpower_financing:this.state.mpower_financing,
      applicant_loan_amount:this.state.applicant_loan_amount


     };

 applicant_bank_select_data = new Array();
 if(this.state.incred == true)
 {
   applicant_bank_select_data.push('incred');
 }
 if(this.state.avanse_bank == true)
 {

   applicant_bank_select_data.push('avanse_bank');
 }
 if(this.state.credila == true)
 {

   applicant_bank_select_data.push('credila');
 }
 if(this.state.axis_bank == true)
 {
   applicant_bank_select_data.push('axis_bank');
 }
 if(this.state.auxilo == true)
 {
   applicant_bank_select_data.push('auxilo');
 }
  if(this.state.mpower_financing == true)
 {
   applicant_bank_select_data.push('mpower_financing');
 }


 applicant_bank_select = applicant_bank_select_data.join(',');

  AsyncStorage.setItem("applicant_bank_select",applicant_bank_select);
  // console.log('Selected Bank:' + applicant_bank_select);
   if(applicant_bank_select == '')
   {

     ToastAndroid.show('Select one or more loan offers to continue your application', ToastAndroid.SHORT);
       return 'failed';
   }

 var url = global.serverUrl+'/appnew/form/bank_select';

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
    console.log("response: " + responseData);
   arr = JSON.parse(responseData);



AsyncStorage.setItem("applicant_loan_amount",this.state.applicant_loan_amount.toString());
return 'success';


 })
.catch((err) => { console.log(err); });



 }




async saveData(key,value)
{




if(key == 'applicant_loan_amount')
{
 this.setState({"applicant_loan_amount": value});
console.console.log("kapil");
this._loanOfferData();








//console.log(key);
//console.log(value);

}


}



_nextStep = async () => {




// SUBMIT DATA TO SERVER
formResp = await this._submitFormData();
console.log('hello');
// SUBMIT DATA TO SERVER
if(formResp !== 'failed'){


this.props.navigation.navigate('Applicantkycform');
}
else
{
   // Alert.alert( 'Alert', 'Error Occured' );
}

  }

         _prevStep = async () => {

this.props.navigation.navigate('Customeradmitform');
  }



 _loanOfferData = async () =>
 {

     let formData = {

      applicant_contact_no : await  AsyncStorage.getItem("applicant_contact_no"),
       applicant_loan_amount:this.state.applicant_loan_amount

     };

 console.log('start work');
  console.log(formData);

 var url = global.serverUrl+'/appnew/form/loan_offer';
console.log(url);
console.log(formData);

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
   console.log(responseData);
   arr = JSON.parse(responseData);

this.setState({"data": arr});
this.setState({visible: false});


 })
.catch((err) => { console.log(err); });

 }


_dataSync = async (applicant_contact_no) =>
 {

         if(applicant_contact_no == null)
        {

            return 'failed';
        }

     let formSubmitObject = {

         applicant_contact_no : applicant_contact_no,
        'screen':'Bankloanoffer'

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


    console.log("prop: " + prop + " value: " + arr[prop]);


if(prop == 'applicant_loan_amount')
{


arr[prop] =   parseInt(arr[prop]);
 if(arr[prop] != null){
this.setState({ [prop]: parseInt(arr[prop]) });
this.setState({ value : parseInt(arr[prop]) });
}

this._loanOfferData();

}
else if(prop == 'applicant_profile_image' && arr[prop] != null)
{
    var image_path = global.serverUrl+arr[prop].replace('\\','');

    let source = { uri: image_path };
 this.setState({applicant_profile_image : source });

}
else(prop == 'applicant_bank_select')
{
if(arr[prop] != null)
{
  selectedBankStr = arr[prop].toString();
selectedBank = selectedBankStr.split(",");

    if(selectedBank.indexOf('incred') !== -1)
    {
     this.setState({ incred: true });


    }
    if(selectedBank.indexOf('avanse_bank') !== -1)
    {
     this.setState({ avanse_bank: true });


    }
    if(selectedBank.indexOf('credila') !== -1)
    {
     this.setState({ credila: true });


    }
    if(selectedBank.indexOf('axis_bank') !== -1)
    {
     this.setState({ axis_bank: true });


    }
    if(selectedBank.indexOf('auxilo') !== -1)
    {
     this.setState({ auxilo: true });


    }
    if(selectedBank.indexOf('mpower_financing') !== -1)
    {
     this.setState({ mpower_financing: true });


    }

                        }

}


  }
}


}

 })
.catch((err) => { console.log(err); });

 }






render() {


   // LOAN OFFER DATA
      var dataHtml = [];
if(this.state.data && this.state.data != 'none'){
//console.log('data is avalible');
//console.log(Object.keys(this.state.data).length);

  for(let i = 1; i <= Object.keys(this.state.data).length; i++){
//console.log(this.state.data[i]);

//imageSource = global.serverUrl+'/images/'+this.state.data[i].bank_logo;

loanAmount = this.state.data[i].loan_amount;
rateOfInterest = this.state.data[i].rate_of_interest_min+'% - '+this.state.data[i].rate_of_interest_max+'%';
emi = currencyConverter(Math.round(this.state.data[i].emi_min_repayment))+'- '+currencyConverter(Math.round(this.state.data[i].emi_max_repayment));
tenure = this.state.data[i].repayment_period_min+'Yr - '+this.state.data[i].repayment_period_max+'Yr';
//console.log(imageSource);
//let n=this.state.data[i].length;
//if (this.state.data[i].length>1) {
//  // console.log(this.state.data[i][1].substream_name);
//}

bankName = this.state.data[i].bank_display_name.toLowerCase().replace(" ","_");

//imageSource = credilaImage;
//console.log(imageSource);

    dataHtml.push(
<Card key={i}>
                        <Item>


                {bankName == 'incred' &&
                              <ListItem style={styles.RemoveBottomBorder} style={{marginLeft:5}} onPress={() => this.setState({ 'incred' : !this.state.incred})} >

                        <Image source={incredImage} style={styles.incred}/>
                              <CheckBox onPress={() => this.setState({ 'incred' : !this.state.incred})} checked={this.state.incred}  style={{width:18, height:18, borderColor:'#f7a700',backgroundColor: !this.state.incred ? '#fff' : '#f7a700' , marginLeft:window.width-150}}/>
                        </ListItem>
                }

                  {bankName == 'avanse_bank' &&
                           <ListItem style={styles.RemoveBottomBorder} style={{marginLeft:5}} onPress={() => this.setState({ 'avanse_bank' : !this.state.avanse_bank})} >

                        <Image source={avanseImage} style={styles.credila}/>

                              <CheckBox onPress={() => this.setState({ 'avanse_bank' : !this.state.avanse_bank})} checked={this.state.avanse_bank} style={{width:18, height:18, borderColor:'#f7a700',backgroundColor: !this.state.avanse_bank ? '#fff' : '#f7a700' , marginLeft:window.width-150}}/>
                              </ListItem>
                }

                {bankName == 'credila' &&
                            <ListItem style={styles.RemoveBottomBorder} style={{marginLeft:5}} onPress={() => this.setState({ 'credila' : !this.state.credila})} >

                        <Image source={credilaImage} style={styles.credila}/>
                              <CheckBox onPress={() => this.setState({ 'credila' : !this.state.credila})} checked={this.state.credila} style={{width:18, height:18, borderColor:'#f7a700',backgroundColor: !this.state.credila ? '#fff' : '#f7a700' , marginLeft:window.width-150}}/>
                    </ListItem>
                }

                {bankName == 'axis_bank' &&
                       <ListItem style={styles.RemoveBottomBorder} style={{marginLeft:5}} onPress={() => this.setState({ 'axis_bank' : !this.state.axis_bank})}  >

                        <Image source={axisImage} style={styles.credila}/>

                              <CheckBox onPress={() => this.setState({ 'axis_bank' : !this.state.axis_bank})} checked={this.state.axis_bank} style={{width:18, height:18, borderColor:'#f7a700',backgroundColor: !this.state.axis_bank ? '#fff' : '#f7a700' , marginLeft:window.width-150}}/>
                        </ListItem>
                }

                 {bankName == 'auxilo' &&
                       <ListItem style={styles.RemoveBottomBorder} style={{marginLeft:5}} onPress={() => this.setState({ 'auxilo' : !this.state.auxilo})}  >

                        <Image source={auxiloImage} style={styles.auxilo}/>

                              <CheckBox onPress={() => this.setState({ 'auxilo' : !this.state.auxilo})} checked={this.state.auxilo} style={{width:18, height:18, borderColor:'#f7a700',backgroundColor: !this.state.auxilo ? '#fff' : '#f7a700' , marginLeft:window.width-150}}/>
                        </ListItem>
                }

                     {bankName == 'mpower_financing' &&
                       <ListItem style={styles.RemoveBottomBorder} style={{marginLeft:5}} onPress={() => this.setState({ 'mpower_financing' : !this.state.mpower_financing})}  >

                        <Image source={mpowerImage} style={styles.credila}/>

                              <CheckBox onPress={() => this.setState({ 'mpower_financing' : !this.state.mpower_financing})} checked={this.state.mpower_financing} style={{width:18, height:18, borderColor:'#f7a700',backgroundColor: !this.state.mpower_financing ? '#fff' : '#f7a700' , marginLeft:window.width-150}}/>
                        </ListItem>
                }



                        </Item>

                        <View style={{flex: 1, flexDirection: 'row', paddingTop:10, paddingBottom:10}}>

                        <Left>
                           <View style={{paddingLeft:10}}>
                            <Text note style={{fontSize:12,color:'#2f2f2f',fontFamily: 'CircularStd'}}>Rate of interest</Text>
                            <Text style={{color:'#2f2f2f',fontSize:13,fontFamily: 'CircularStd'}}>{rateOfInterest}</Text>
                          </View>
                          </Left>
                          <Body>
                          <View>
                            <Text note style={{fontSize:12,color:'#2f2f2f', fontFamily: 'CircularStd',textAlign:'center'}}>EMI</Text>
                            <Text style={{color:'#2f2f2f',fontSize:13, fontFamily: 'CircularStd',textAlign:'center'}}>&#8377; {emi}</Text>
                          </View>
                          </Body>
                          <Right>
                          <View style={{paddingRight:10}}>
                            <Text note style={{fontSize:12,color:'#2f2f2f', fontFamily: 'CircularStd'}}>Tenure</Text>
                            <Text style={{color:'#2f2f2f',fontSize:13, fontFamily: 'CircularStd'}}>{tenure}</Text>
                          </View>
                          </Right>
                        </View>

                    </Card>
    )
           }

                   }



    // LOAN OFFER DATA



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
            <Text style={styles.ProgressHeading1}>Loan offers</Text>
            <Label style={styles.ProgressHeading2}>Select one or more loan offers to continue your application</Label>
        </View>

           <Content style={styles.content}>
           <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} overlayColor='rgba(0, 0, 0, 0.75)' cancelable={true} />

      <View style={styles.sliderBox}>
        <Slider
          value={this.state.applicant_loan_amount}
          onSlidingComplete={applicant_loan_amount => this.saveData('applicant_loan_amount', applicant_loan_amount)}
          onValueChange={value => this.setState({ value })}
          minimumValue={50000}
          maximumValue={10000000}
          step={50000}
          trackStyle={customStyles2.track}
            thumbStyle={customStyles2.thumb}
minimumTrackTintColor='#f7a700'

        />
        <Text style={{marginBottom:5}}>
          Amount: <Text>&#8377;</Text>{currencyConverter(this.state.value)}
        </Text>
      </View>

         <View>

   {dataHtml}

        </View>
      </Content>

     <Footer style={{backgroundColor:'white'}}>
                         <Left style={{paddingLeft:12}}>
                        <Button half onPress={this._prevStep} style={{borderRadius:30, backgroundColor:'white' ,width:100, alignItems:'center', justifyContent:'center', height:40}}>
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

var customStyles2 = StyleSheet.create({
  track: {
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: 'white',
    borderColor: '#f7a700',
    borderWidth: 2,
  }
});



export default Bankloanoffer;
