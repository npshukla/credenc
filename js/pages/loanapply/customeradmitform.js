import React, { Component } from "react";
import { View ,Platform,AsyncStorage, KeyboardAvoidingView ,Alert ,TouchableHighlight,BackHandler,ToastAndroid,  Keyboard, TouchableWithoutFeedback, ScrollView,NetInfo} from 'react-native';
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
  Card,
  List,
  CardItem,
  Icon,
   ListItem,
   CheckBox,
   Text,
   Radio,
   ActionSheet,
   Picker,
   Root
 
//  Form,
  
} from "native-base";


import styles from "./styles";

//import Exponent, { DocumentPicker, Constants, ImagePicker, registerRootComponent,FileSystem } from 'expo';
import {  Image } from 'react-native';
import AutoComplete from 'react-native-autocomplete-select';
import LinearGradient from 'react-native-linear-gradient';


const Dimensions = require('Dimensions');

const window = Dimensions.get('window');


const drawerImage = require("../../../img/bitmap.png");

const personImage = require("../../../img/persion.png");



import MultiSelect from 'react-native-multiple-select';
// import Autocomplete from 'react-native-autocomplete-input';


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



class Customeradmitform extends Component {
 constructor(props) {
    super(props);


this.backButtonListener = null;
        this.currentRouteName = 'Main';
        this.lastBackButtonPress = null;

this.state = {  

    showFooter: true,
      
      applicant_contact_no: '',
      
      customer_admitin:true,
      customer_waitin:false,
      applicant_college_admitted : '',
      applicant_college_name:'',
      applicant_course : '',
      country_id       : '',
applicant_exams   :  '',

 applicant_loan_amount : '',
  applicant_profile_image:personImage,
 streamData:'',
 colleges:'',
 examData:'',
 collegeData:'',
 courseData:'',
 applicant_loan_amount_unvalid:false,
 suggestion_value:''
 
   
    };

this.state = {
    selectedItems : []
  };

this.items = [{
    id: 'gre',
    name: 'GRE',
  }, {
    id: 'gmat',
    name: 'GMAT',
  }, {
    id: 'ielts',
    name: 'IELTS',
  }, {
    id: 'toefl',
    name: 'TOEFL',
  }, {
    id: 'jee',
    name: 'JEE',
  }];




//console.debug('startup');



  } 
  
  
async componentDidMount() {
  this.setState({"showFooter": true});
    
 
  //const {goBack} = this.props.navigation;    goBack();
this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {


                if (this.lastBackButtonPress + 2000 >= new Date().getTime()) {
                    BackHandler.exitApp();
                    return true;
                }
                // ToastAndroid.show('Press again to exit :)', ToastAndroid.SHORT);
                this.lastBackButtonPress = new Date().getTime();

                this.props.navigation.navigate('Customerimageform');

                return true;
                
             });    

this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
 this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));       




     
  // ASYNC STORAGE TO STATE
await  AsyncStorage.setItem("current_step", 'Customeradmitform');

// NEW CODE 
NetInfo.getConnectionInfo().then((connectionInfo) => {
  
  if(connectionInfo.type == 'none')
  {
    // No Internet
var dataKeys = new Array('applicant_contact_no', 'applicant_profile_image','applicant_college_admitted','applicant_college_name','applicant_course','country_id','applicant_exams','applicant_loan_amount');
   
AsyncStorage.multiGet(dataKeys, (err, stores) =>
    { stores.map((result, i, store) => {  
    
let key = store[i][0]; 

let value = store[i][1];



if(key == 'applicant_college_admitted' )
{
 
 if(value == 'admitted')
{
    
  this.setState({"customer_admitin": true});
  this.setState({"customer_waitin": false}); 
}    
    else
    {
    if(value == null)
    {
      this.setState({"customer_admitin": true});
  this.setState({"customer_waitin": false});   
    }
    else
    {
     this.setState({"customer_admitin": false});
  this.setState({"customer_waitin": true});    
    }
    
         
    }
 
 
 
}
else if(key == 'applicant_course' )
{
     this._fetchCourse(); 
   this._fetchStream(value);  
}
else if (key=='country_id') {
   this._fetchCountry(); 

   this._fetchExams(value);
}
else
{
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

value =   currencyConverter(value);
    }                       
                            
}
else
{
 this.setState({ [key]: value });    
}

 
 
 
}
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
else if(key == 'applicant_college_admitted' )
{
 
 if(value == 'admitted')
{
    
  this.setState({"customer_admitin": true});
  this.setState({"customer_waitin": false}); 
}    
    else
    {
    if(value == null)
    {
      this.setState({"customer_admitin": true});
  this.setState({"customer_waitin": false});   
    }
    else
    {
     this.setState({"customer_admitin": false});
  this.setState({"customer_waitin": true});    
    }
    
         
    }
 
 
 
}
else if(key == 'applicant_course' )
{
     this._fetchCourse(); 
   this._fetchStream(value);  
}
else if (key=='country_id') {
   this._fetchCountry(); 

   this._fetchExams(value);
}
else
{
  if(key == 'applicant_profile_image')
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

value =   currencyConverter(value);
    }                       
                            
}
else
{
  this.setState({ [key]: value });    
}

}
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

if(this.state.applicant_loan_amount == null)
{
 this.setState({ applicant_loan_amount_unvalid: true });
        ToastAndroid.show('Loan Amount Should be between 50,000 to 1,00,00,000', ToastAndroid.SHORT);  
            return 'failed';   
    
}


  var a=this.state.applicant_loan_amount.replace(/\,/g,''); // 1125, but a string, so convert it to number
    a=parseInt(a,10);
    if (isNaN(a) || a<50000 || a>10000000) {
            this.setState({ applicant_loan_amount_unvalid: true });
        ToastAndroid.show('Loan Amount Should be between 50,000 to 1,00,00,000', ToastAndroid.SHORT);  
            return 'failed';
        }
       
       
      applicant_loan_amount = this.state.applicant_loan_amount;
      
       
        
        
     let formSubmitObject = {
       customer_admitin:this.state.customer_admitin,
       customer_waitin:this.state.customer_waitin,
         
         applicant_college_name : this.state.applicant_college_name,
         
           applicant_course :  this.state.applicant_course,
applicant_sub_stream : this.state.applicant_sub_stream,
country_id       :         this.state.country_id,
applicant_exams   :      this.state.applicant_exams,
 applicant_contact_no:   this.state.applicant_contact_no,
 applicant_loan_amount : applicant_loan_amount.replace(/\,/g,"")
 
   
     };

  console.log(formSubmitObject);
 
 var url = global.serverUrl+'/appnew/form/applicant_admission_detail';

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
   
return responseData;
    
 })
.catch((err) => { console.log(err); });  
     
  
     
 }


async allCollegesData(query) {

//var query = 'indian';
url = global.serverUrl+'/appnew/form/allColleges?query='+query;
//url = 'https://www.credenc.com/appnew/form/allColleges?query='+query;
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
    

    if(responseData !== 'none'){
    console.log(responseData);    
    
                    this.setState({colleges: JSON.parse(responseData)}) ; }
  })
.catch((err) => { console.log(err); });   
    
    
    
    
}

 onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems:selectedItems });
    console.log(selectedItems);
   selectedItemsString = JSON.stringify(selectedItems);
  this.setState({"applicant_exams": selectedItemsString}); 
 
 AsyncStorage.setItem("applicant_exams", selectedItemsString); 
 
  };





async saveData(key,value)
{
if(key == 'applicant_college_name')
{
 // console.log('college name :'+value);  

 this.setState({"applicant_college_name": value}); 
 this.allCollegesData(value);
 
 await  AsyncStorage.setItem("applicant_college_name", value); 
}
if(key == 'applicant_course')
{
    
if(value == '0')
{
 
   value = null; 
}    

 this.setState({"applicant_course": value}); 
 
 
 this._fetchStream(value);
 await  AsyncStorage.setItem("applicant_course", value);
 
 
 
}
if(key == 'applicant_sub_stream')
{
 this.setState({"applicant_sub_stream": value}); 
 await  AsyncStorage.setItem("applicant_sub_stream", value); 
}

if(key == 'country_id')
{
    
if(value == '0')
{
   
   value = null; 
}     
    

 this.setState({"country_id": value}); 
 this._fetchExams(value);
 this.multiSelect._removeAllItems();
 await  AsyncStorage.setItem("country_id", value); 
}
if(key == 'applicant_loan_amount')
{
// CONVERTER
    this.setState({ applicant_loan_amount_unvalid: false });

    res = currencyConverter(value);
 //console.log('currency value is :'+res);
// CONVERTER
 this.setState({"applicant_loan_amount": res}); 
 value = value.replace(/\,/g,"");
 await  AsyncStorage.setItem("applicant_loan_amount", value); 
}


if(key == 'applicant_exams')
{


 this.setState({"applicant_exams": value}); 
 await  AsyncStorage.setItem("applicant_exams", value); 
}

if(key == 'applicant_college_admitted')
{
if(value == 'admitted')
{
    
  this.setState({"customer_admitin": true});
  this.setState({"customer_waitin": false}); 
}    
    else
    {
      this.setState({"customer_admitin": false});
  this.setState({"customer_waitin": true});    
    }
await  AsyncStorage.setItem("applicant_college_admitted", value);

}


}



_nextStep = async () => {
    

    
formResp = await this._submitFormData();

// SUBMIT DATA TO SERVER
if(formResp !== 'failed'){
 
this.props.navigation.navigate('Bankloanoffer');
}
else
{
   // Alert.alert( 'Alert', 'Error Occured' );
}


	}
 _prevStep = async () => {

this.props.navigation.navigate('Customerimageform');

	} 
    
_fetchStream = async(course) => {
   // console.log(course);
  var sendData = {'stream_name':course};
url = global.serverUrl+'/appnew/form/substreamList'
 fetch(url, {
  method: 'POST',
  headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
           },
  body: JSON.stringify(sendData)
})
.then(
(response) => response.text()
) 
.then((responseData) => {  
 
                    this.setState({streamData: JSON.parse(responseData)}) ;
  })
.catch((err) => { console.log(err); });   
    
    
    
    
}


_fetchCountry = async() => {
  
url = global.serverUrl+'/appnew/form/allCountry';
 fetch(url, {
  method: 'GET'
})
.then(
(response) => response.text()
) 
.then((responseData) => {  
   //console.log(responseData);
                    this.setState({collegeData: JSON.parse(responseData)}) ;
  })
.catch((err) => { console.log(err); });   
    
    
    
    
}

_fetchExams = async(country_id) => {
   // console.log(country_id);
  var sendData = {'Country_name':country_id};
url = global.serverUrl+'/appnew/form/examByCountry?Country_name='+country_id;
 fetch(url, {
  method: 'GET'
})
.then(
(response) => response.text()
) 
.then((responseData) => {  
  //console.log("hey");
    console.log(responseData);
                    this.setState({examData: JSON.parse(responseData)}) ;
  })
.catch((err) => { console.log(err); });   
    
    
    
    
}

_fetchCourse = async() => {
 
url = global.serverUrl+'/appnew/form/allCourses';
 fetch(url, {
  method: 'GET'
})
.then(
(response) => response.text()
) 
.then((responseData) => {  
    console.log(responseData);
                    this.setState({courseData: JSON.parse(responseData)}) ;
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
        'screen':'Customeradmitform'
          
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


if(prop == 'applicant_college_admitted' )
{
 
 if(arr[prop] == 'admitted')
{
    
  this.setState({"customer_admitin": true});
  this.setState({"customer_waitin": false}); 
}    
    else
    {
    if(arr[prop] == null)
    {
      this.setState({"customer_admitin": true});
  this.setState({"customer_waitin": false});   
    }
    else
    {
     this.setState({"customer_admitin": false});
  this.setState({"customer_waitin": true});    
    }
    
         
    }
 
 
 
}
else if(prop == 'applicant_profile_image' && arr[prop] != null)
{
    var image_path = global.serverUrl+arr[prop].replace('\\','');
   
    let source = { uri: image_path };    
 this.setState({applicant_profile_image : source });
    
}
else
{
 if(prop == 'applicant_loan_amount')
{
    if(arr[prop] != null){

arr[prop] =   currencyConverter(arr[prop]);
    }                       
                            
}

 this.setState({ [prop]: arr[prop] });   
    
}
                            
 



if(prop == 'applicant_course' )
{
     this._fetchCourse(); 
   this._fetchStream(arr[prop]);  
}

if (prop=='country_id') {
   this._fetchCountry(); 

   this._fetchExams(arr[prop]);
}    
    
    
    
    
    
  }
}  
    
    
}




    
 })
.catch((err) => { console.log(err); });  
     
 }







render() {


   // All Colleges
  // console.log(this.state.colleges);



// const suggestions = [
//   {text: 'suggestion1', anotherProperty: 'value'},
//   {text: 'jnu', anotherProperty: 'value3'},
//   {text: 'iit', anotherProperty: 'value4'},
//   {text: 'nit', anotherProperty: 'value5'},
//   {text: 'iiit', anotherProperty: 'value6'},
//   {text: 'abc', anotherProperty: 'value7'},
//   {text: 'suggestion2', anotherProperty: 'value2'}
// ]

const onSelect = (suggestion) => {
 // console.log('college name :'+suggestion.text); // the pressed suggestion
  this.setState({ "applicant_college_name":suggestion.text});
 AsyncStorage.setItem("applicant_college_name", suggestion.text);
Keyboard.dismiss();
}
  
// end


// Country Data 

const country_idHtml=[];

if (this.state.collegeData!='[]' && this.state.collegeData!=undefined) {
 // console.log(this.state.collegeData.length);
  for(let i = 0; i < this.state.collegeData.length; i++){
      
  if(this.state.collegeData[i] == 'none'){
   country_idHtml.push(
                    
                     <Item key={i} label="-------" value="0" />
            
                    )   
      
  }
  else
  {
  
       country_idHtml.push(
                    
                     <Item key={i} label={this.state.collegeData[i]} value={this.state.collegeData[i]} styles={styles.pickerFont}/>
            
                    )
  }
}
}


 const courseHtml=[];

if (this.state.courseData!='[]' && this.state.courseData!=undefined) {
 // console.log(this.state.courseData.length);
  for(let i = 0; i < this.state.courseData.length; i++){
      
  if(this.state.courseData[i] == 'none')
  {
    courseHtml.push(
                    
                     <Item key={i} label="---------------------" value="0" styles={styles.pickerFont}/>
            
                    )   
      
  }
  else
  {
   courseHtml.push(
                    
                     <Item key={i} label={this.state.courseData[i]} value={(this.state.courseData[i]).toLowerCase()} styles={styles.pickerFont}/>
            
                    )    
      
      
  }
  
  
      
  }
}


  const { selectedItems } = this.state;

  var dataHtml = [];

if(this.state.streamData && this.state.streamData != 'none'){
    
//console.log(this.state.streamData.length);

 for(let i = 0; i < this.state.streamData.length; i++){
            dataHtml.push(
                    
                     <Item key={i} label={this.state.streamData[i]} value={this.state.streamData[i]} styles={styles.pickerFont} onValueChange={(applicant_sub_stream) => this.saveData( applicant_sub_stream ,this.state.streamData[i])}/>
            
                    )
    
            }
    
}  

// SCORE
var scoreHtml = [];

if(this.state.selectedItems && this.state.selectedItems != 'none'){
  //  console.log('selectd Item Length');

if(this.state.selectedItems.length > 0){
 for(let j = 0; j < this.state.selectedItems.length; j++){
 //console.log(this.state.examData[j]['name']);    
 //console.log('selcted Items:'+this.state.selectedItems[j]);
            scoreHtml.push(
                    
                     <Item key={j} floatingLabel>
          <Label style={styles.ExamScorelevel}>{this.state.selectedItems[j]} Scores</Label>
            <Input keyboardType="numeric" ref= {(el) => { this.customer_score[this.state.selectedItems[j]] = el; }} style={styles.scoreInput}/>
            </Item>
                    )
    
            }
        }
    
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

        <ActionSheet ref={(c) => { ActionSheet.actionsheetInstance = c; }} />
         <View style={styles.profileheading}>
            <Text style={styles.ProgressHeading1}>Select your college and course</Text>
          
        </View> 


        <Content>     
     
      
         <View style={{borderRadius:10, backgroundColor:'white', margin:10, overflow: 'hidden'}}>
           
            <Item style={{padding:10}} onPress={() => this.saveData("applicant_college_admitted",'admitted')}>
            
            <Left>
              <Radio  selected={this.state.customer_admitin}
            onPress={() => this.saveData("applicant_college_admitted",'admitted')}/>
            <Text style={{fontSize:15, marginLeft:30, marginTop:-20}}>I have admission in</Text>
            </Left>
           </Item>

            {this.state.customer_admitin == true &&
          
                 <AutoComplete
          onSelect={onSelect}
         
          placeholder="Search College"
          minimumSimilarityScore={0.1}
          suggestions={this.state.colleges}
          onChangeText={(applicant_college_name) => this.saveData('applicant_college_name', applicant_college_name)}
          suggestionObjectTextProperty='text'
          value={this.state.applicant_college_name}
          suggestionStyle={{minHeight:30,borderBottomWidth:1, backgroundColor:'white'}}
          underlineColorAndroid='transparent'
          style={{marginLeft:5}}
        />
          }
           {this.state.customer_admitin == true &&
        <Item>
          <Picker
              mode="dialog"
              title="Type Your Stream"
              placeholder="Stream"
              style={{ width: window.width-30 }}
              textStyle={{fontSize:5}}
            selectedValue={this.state.applicant_course}
              onValueChange={(applicant_course) => this.saveData( 'applicant_course' ,applicant_course)}
             
            >
            <Item label="Select Courses" value="null" />
            {courseHtml}
              
            </Picker>  
            </Item>
            }

            {this.state.customer_admitin == true &&
        <Item>
          <Picker
              mode="dialog"
              placeholder="Sub Stream"
              iosHeader="Your Header"
              style={{ width: window.width-30 }}
              
            selectedValue={this.state.applicant_sub_stream}
              onValueChange={(applicant_sub_stream) => this.saveData( 'applicant_sub_stream' ,applicant_sub_stream)}
             
            >
            <Item label="Select Degree" value="null" />
           {dataHtml}
              
            </Picker>  
            </Item>
            }

        </View>

         <View style={{borderRadius:10, backgroundColor:'white', margin:10,  overflow: 'hidden'}}>
           <Item style={{padding:10}} onPress={() => this.saveData("applicant_college_admitted",'awaited')}>
            
            <Left>
              <Radio selected={this.state.customer_waitin}
            onPress={() => this.saveData("applicant_college_admitted",'awaited')}/>
             <Text style={{fontSize:15, marginLeft:30, marginTop:-20}}>I am waiting for an admission</Text>
            </Left>
          </Item>

           {this.state.customer_admitin == false &&
        <Item>
          <Picker
              mode="dialog"
              
              placeholder="Country"
              iosHeader="Your Header"
              style={{ width: window.width-50, marginLeft:5 }}
              
            selectedValue={this.state.country_id}
              onValueChange={(country_id) => this.saveData( 'country_id' ,country_id)}
             
            >
            <Item label="Select Country" value="null" styles={styles.pickerFont}/>
           {country_idHtml}
              
            </Picker>  
            </Item>
            }

  
            {this.state.customer_admitin == false &&          
          
           <View style={{flex:1, paddingBottom:10}}>
    
    
    
    <Item style={{flex:1, borderBottomWidth:0}}>
        <MultiSelect
          hideTags
          
          items={this.state.examData}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Select Exam"
          searchInputPlaceholderText="Search Exam .."
          onChangeInput={ (text)=> console.log(text)}
         textColor='#000'
         placeholderTextColor='#000'
         fontSize={15}
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          style={{paddingLeft:50}}
          displayKey="name"
          fixedHeight={false}
          searchInputStyle={{ color: '#CCC' }}
         
          hideSubmitButton= {true}
        />
        
      </Item>
    
      {scoreHtml}

    </View>
          
            }

        </View>

        <View style={{borderRadius:10, backgroundColor:'white', margin:10, overflow: 'hidden'}}>
      <Item floatingLabel>
          <Label style={styles.laonAmountheading}>Loan Amount(&#8377;)</Label>
            <Input keyboardType="numeric"   ref= {(el) => { this.applicant_loan_amount = el; }}
    onChangeText={(applicant_loan_amount) => this.saveData('applicant_loan_amount', applicant_loan_amount)} 
    value={this.state.applicant_loan_amount} style={styles.InputField} style={{marginLeft:5}}/>
   
     { this.state.applicant_loan_amount_unvalid == true   &&
    <Icon name='close-circle' style={{ color: 'red'}} />
    }
   
          </Item>  
        
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
            


    
    
export default Customeradmitform;
