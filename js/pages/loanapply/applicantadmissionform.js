import React, { Component } from "react";
import { View, Platform, AsyncStorage, KeyboardAvoidingView, TouchableHighlight, BackHandler, ToastAndroid, Keyboard, TouchableWithoutFeedback, ScrollView, NetInfo} from 'react-native';
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
        import store from 'react-native-simple-store';
        import LinearGradient from 'react-native-linear-gradient';
//        import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
        import styles from "./styles";
        const drawerImage = require("../../../img/bitmap.png");
        const personImage = require("../../../img/persion.png");
        const uploadImage = require("../../../img/upload-button.png");
        import * as Progress from 'react-native-progress';
//import Exponent, { DocumentPicker, Constants, ImagePicker, registerRootComponent,FileSystem } from 'expo';
        import {  Image } from 'react-native';
        import renderIf from './renderIf';
        var ImagePicker = require('react-native-image-picker');
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
//        { text: "Documents", icon: "document", iconColor: "#f42ced" },
        { text: "Cancel", icon: "close", iconColor: "#25de5b" }
        ];
        var DESTRUCTIVE_INDEX = 2;
        var CANCEL_INDEX = 3;
// Keyboard dismiss
        const DismissKeyboard = ({ children }) => (
        < TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()} >
        {children}
        </TouchableWithoutFeedback>
        );
        class Applicantadmissionform extends Component {
        constructor(props) {
        super(props);
                this.state = {

                applicant_contact_no: '',
                        applicant_i20_uploaded: "",
                        applicant_admission_letter_uploaded: "",
                        applicant_resume_uploaded: "",
                        applicant_profile_image:personImage,
                        customer_admission:true,
                        applicant_college_type:"india"

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
                this.props.navigation.navigate('Applicantkycform');
                return true;
        });
        // ASYNC STORAGE TO STATE
        await  AsyncStorage.setItem("current_step", 'Applicantadmissionform');
        NetInfo.getConnectionInfo().then((connectionInfo) => {

        if (connectionInfo.type == 'none')
        {
        // No Internet

        var dataKeys = new Array('applicant_contact_no', 'applicant_college_admitted', 'applicant_i20_uploaded', 'applicant_admission_letter_uploaded', 'applicant_resume_uploaded', 'applicant_profile_image');
                AsyncStorage.multiGet(dataKeys, (err, stores) =>
                { stores.map((result, i, store) => {
//                        console.log("component Did Mount In none Block");
//                        console.log(store);
                let key = store[i][0];
                        let value = store[i][1];
                        if (key == 'applicant_profile_image')
                {
                if (value != null){
                let source = { uri: value };
                        this.setState({ [key]: source });
                }
                }
                else if (key == 'applicant_college_admitted')
                {

                if (value == 'admitted')
                {
                this.setState({"customer_admission": true});
                }
                else{
                this.setState({"customer_admission": false});
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

        var dataKeys = new Array('applicant_contact_no', 'applicant_college_admitted', 'applicant_profile_image');
                AsyncStorage.multiGet(dataKeys, (err, stores) =>
                { stores.map((result, i, store) => {
//                        console.log("component Did Mount In none Block");
//                console.log(store);
                let key = store[i][0];
                        let value = store[i][1];
                        if (key == 'applicant_contact_no')
                {

                this._dataSync(value);
                        this.setState({ [key]: value });
                }
                else if (key == 'applicant_profile_image')
                {
//if(value != null){
//let source = { uri: value };    
// this.setState({ [key]: source }); 
// }  
                }
                else if (key == 'applicant_college_admitted')
                {

                if (value == 'admitted')
                {
                this.setState({"customer_admission": true});
                }
                else{
                this.setState({"customer_admission": false});
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
                        this.docUpload(BUTTONS[buttonIndex], field);
                        }
                )

        }

        docUpload(docAction, field) {
        if (docAction != undefined){
        if (docAction.text == 'Open Camera')
        {
        this._takePhoto(field);
        }
        if (docAction.text == 'Image')
        {
        this._pickImage(field);
        }

        if (docAction.text == 'Documents')
        {
        this._pickDocument(field);
        }
        }

        }

        _takePhoto = async (field) => {

        ImagePicker.launchCamera(options, (response) => {
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
                console.log('uploading: ' + field);
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this._handleImagePicked(source, field);
//    this.setState({
//     field: true
//    });
        }
        });
                //  this._handleImagePicked(pickerResult,field);



        };
                _pickImage = async (field) => {
        // Open Image Library:
        ImagePicker.launchImageLibrary(options, (response) => {
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
        let source = { uri: 'file://' + response.path };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this._handleImagePicked(source, field);
        }

        // Same code as in above section!
        });
        };
                _pickDocument = async (field) => {

        DocumentPicker.show({
        filetype: [DocumentPickerUtil.pdf()],
        }, (error, res) => {
        // Android
        if(res){
                uploadResponse = this.uploadDocumentAsync(res.uri, field);
                console.log(uploadResponse);
            }
        });
                //  this._handleImagePicked(pickerResult);
                if (field == 'applicant_i20')
        {  console.log('picked1');
                this.setState({ applicant_i20_uploaded: "true" });
        }
        if (field == 'applicant_admission_letter')
        {
        this.setState({ applicant_admission_letter_uploaded: "true" });
        }
        if (field == 'applicant_resume')
        {
        this.setState({ applicant_resume_uploaded: "true" });
        }
        await  AsyncStorage.setItem(field + "_uploaded", "true");
                console.log(field);
        }


        _handleImagePicked = async (pickerResult, field) => {
        // let uploadResponse, uploadResult;

        try {


        if (pickerResult.uri != undefined) {

        // alert(pickerResult.uri);
        uploadResponse = this.uploadImageAsync(pickerResult.uri, field);
                //  uploadResult = await uploadResponse.json();
                // this.setState({ image: uploadResult.location });
                console.log('uploadResponse');
                console.log(field);
                // console.log(uploadResult);
//        Toast.show({
//                text: "Upload Done",
//                buttonText: "",
//                duration:2000,
//                type:"success",
//                position:"bottom"
//              }); 

                if (field == 'applicant_i20')
        {
        console.log('picked');
                this.setState({ applicant_i20_uploaded: "true" });
        }
        if (field == 'applicant_admission_letter')
        {
        this.setState({ applicant_admission_letter_uploaded: "true" });
        }
        if (field == 'applicant_resume')
        {
        this.setState({ applicant_resume_uploaded: "true" });
        }
        await  AsyncStorage.setItem(field + "_uploaded", "true");
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
                if (field == 'applicant_i20')
        {   console.log('not picked');
                this.setState({ applicant_i20_uploaded: "false" });
        }
        if (field == 'applicant_admission_letter')
        {
        this.setState({ applicant_admission_letter_uploaded: "false" });
        }
        if (field == 'applicant_resume')
        {
        this.setState({ applicant_resume_uploaded: "false" });
        }

        await  AsyncStorage.setItem(field + "_uploaded", "false");
        }

        };
                uploadImageAsync = async (uri, field) => {
        let apiUrl = global.serverUrl + '/appnew/form/applicant_admission_doc';
                let uriParts = uri.split('.');
                let fileType = uriParts[uriParts.length - 1];
                console.log(uri);
                let formData = new FormData();
                formData.append('photo', {
                uri,
                        name: `photo.${fileType}`,
                        type: `image / ${fileType}`

                });
                formData.append('applicant_contact_no', this.state.applicant_contact_no);
                formData.append('field', field);
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
                await fetch(apiUrl, options)
                .then(
                        (response) => response.text()
                        )
                .then((responseData) => {      console.log(responseData); })
                .catch((err) => { console.log(err); });
        }

        uploadDocumentAsync = async (uri, field) => {
        let apiUrl = global.serverUrl + '/appnew/form/applicant_admission_doc';
                let uriParts = uri.split('.');
                let fileType = uri[uri.length - 1];
                app_user_id = await AsyncStorage.getItem('app_user_id');
                borrower_uuid = await AsyncStorage.getItem('borrower_uuid');
                lead_id = await AsyncStorage.getItem('lead_id');
                let formData = new FormData();
                formData.append('photo', {
                uri,
                        name: `photo.pdf`,
                        type: `application / pdf`,
                });
                formData.append('applicant_contact_no', this.state.applicant_contact_no);
                formData.append('app_user_id', app_user_id);
                formData.append('borrower_uuid', borrower_uuid);
                formData.append('lead_id', lead_id);
                formData.append('field', field);
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
                fetch(apiUrl, options)
                .then(
                        (response) => response.text()
                        )
                .then((responseData) => {      console.log(responseData); })
                .catch((err) => { console.log(err); });
        }

// DOC UPLOAD



        getNextCard (getCardPos, currentCard) {
        //return currentCard;

        console.log(currentCard);
//console.log(this.state.applicant_full_name);
                if (currentCard == '0')
        {


        }
        const nextCard = currentCard + 1;
                return nextCard;
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





        _nextStep = async () => {




        this.props.navigation.navigate('Applicantprofessionalform');
        }

        _prevStep = async () => {

        this.props.navigation.navigate('Applicantkycform');
        }


        _dataSync = async (applicant_contact_no) =>
        {

        if (applicant_contact_no == null)
        {

        return 'failed';
        }

        let formSubmitObject = {

        applicant_contact_no : applicant_contact_no,
                'screen':'Applicantadmissionform'

        };
                console.log(formSubmitObject);
                var url = global.serverUrl + '/appnew/form/alldatanew';
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
                        if (arr !== 'none')
                {

                for (var prop in arr) {
                if (arr.hasOwnProperty(prop)) {

                if (prop == 'applicant_college_admitted')
                {

                if (arr[prop] == null)
                {
                this.setState({"customer_admission": false});
                }
                else
                {

                if (arr[prop] == 'admitted')
                {
                this.setState({"customer_admission": true});
                }
                else{
                this.setState({"customer_admission": false});
                }

                }


                }
                else if (prop == 'applicant_profile_image' && arr[prop] != null)
                {
                var image_path = global.serverUrl + arr[prop].replace('\\', '');
                        let source = { uri: image_path };
                        this.setState({applicant_profile_image : source });
                }
                else
                {
                this.setState({ [prop]: arr[prop] });
                }

                console.log("prop: " + prop + " value: " + arr[prop])
                }
                }


                }

                })
                .catch((err) => { console.log(err); });
        }




        render() {




        const forwardIcon = < Icon name = {'ios-arrow-forward'} color = {'gray'} size = {20} / > ;
                const alertIcon = < Icon name = {'ios-alert'} color = {'gray'} size = {20} / > ;
                return (
                        < DismissKeyboard >
                        < LinearGradient colors = {['#352182', '#4f35cb']} style = {styles.linearGradient1} >
                        < Header style = {styles.headercol} >
                        < Left style = {{width:100}} >
                        < Image source = {drawerImage} style = {styles.logo} / >
                        < /Left>
                        < Right >
                        < TouchableHighlight  underlayColor = "white" onPress = {() => this.props.navigation.navigate("Profile")} >
                        < View
                        style = {{
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
                        < Image source = {this.state.applicant_profile_image} style = {styles.profileImg} / >
                        < /View>
                        < /TouchableHighlight>
                        < /Right>

                        < /Header>
                        < ActionSheet ref = {(c) => { ActionSheet.actionsheetInstance = c; }} / >
                        < View style = {styles.profileheading} style = {{paddingBottom:5}} >
                        < Text style = {styles.ProgressHeading1} > Great! Lets get some college details < /Text>
                        < Label style = {styles.ProgressHeading2} > We need you college details to make the right offer for you < /Label>
                        < /View> 
                        < View style = {{paddingLeft:12, paddingBottom:12}} >
                        < Progress.Bar progress = {0.4} width = {200}  color = "#f7a700" borderColor = "#2e1e71" backgroundColor = "#2e1e71" / >
                        < /View>


                        < Content style = {styles.content} >
                        < List style = {styles.MarginList} >
                {renderIf(this.state.applicant_college_type == 'abroad',
                        < ListItem >
                        < Left >
                        < View style = {styles.inlinecss} >
                        < Text style = {styles.DocumentFont1} > Form I-20 < /Text>

                {renderIf(this.state.applicant_i20_uploaded == 'true',
                        < View iconRight success style = {styles.inlinecss} >
                        < Icon name = 'ios-checkmark-circle' style = {styles.successIcon} / >
                        < /View>

                        )}

                < /View>
                        < /Left>
                        < Right >
                        < TouchableHighlight  onPress = {() => this.sheetOpen('applicant_i20')} underlayColor = "white" >
                        < View iconRight success style = {styles.inlinecss} >
                        < Text style = {styles.DocumentFont2} > Upload < /Text>
                        < Image source = {uploadImage} style = {styles.uploadImage} / >
                        < /View>
                        < /TouchableHighlight>



                        < /Right>
                        < /ListItem>


                        )}

                {renderIf(this.state.customer_admission,
                        < ListItem >
                        < Left >
                        < View style = {styles.inlinecss} >
                        < Text style = {styles.DocumentFont1} > College admission letter < /Text>
                {renderIf(this.state.applicant_admission_letter_uploaded == 'true',
                        < View iconRight success style = {styles.inlinecss} >
                        < Icon name = 'ios-checkmark-circle' style = {styles.successIcon} / >
                        < /View>

                        )}
                < /View>
                        < /Left>
                        < Right >
                        < TouchableHighlight  onPress = {() => this.sheetOpen('applicant_admission_letter')} underlayColor = "white" >
                        < View iconRight success style = {styles.inlinecss} >
                        < Text style = {styles.DocumentFont2} > Upload < /Text>
                        < Image source = {uploadImage} style = {styles.uploadImage} / >
                        < /View>
                        < /TouchableHighlight>


                        < /Right>
                        < /ListItem>
                        )}
                < ListItem >
                        < Left >
                        < View style = {styles.inlinecss} >
                        < Text style = {styles.DocumentFont1} > Resume (Optional) < /Text>
                {renderIf(this.state.applicant_resume_uploaded == 'true',
                        < View iconRight success style = {styles.inlinecss} >
                        < Icon name = 'ios-checkmark-circle' style = {styles.successIcon} / >
                        < /View>

                        )}

                < /View>
                        < /Left>
                        < Right >
                        < TouchableHighlight  onPress = {() => this.sheetOpen('applicant_resume')} underlayColor = "white" >
                        < View iconRight success style = {styles.inlinecss} >
                        < Text style = {styles.DocumentFont2} > Upload < /Text>
                        < Image source = {uploadImage} style = {styles.uploadImage} / >
                        < /View>
                        < /TouchableHighlight>



                        < /Right>
                        < /ListItem>


                        < /List>

                        < /Content>

                        < Footer style = {{backgroundColor:'white'}} >
                        < Left style = {{paddingLeft:12}} >
                        < Button half onPress = {this._prevStep} style = {{borderRadius:30, backgroundColor:'white', width:100, alignItems:'center', justifyContent:'center', height:40}} >
                        < Text style = {{color:'black'}} > Back < /Text>
                        < /Button>
                        < /Left>

                        < Right style = {{paddingRight:12}} >
                        < Button half onPress = {this._nextStep} style = {{borderRadius:30, width:100, backgroundColor:'#f7a700', alignItems:'center', justifyContent:'center', height:40}} >
                        < Text > Next < /Text>
                        < /Button>
                        < /Right>

                        < /Footer>


                        < /LinearGradient>
                        < /DismissKeyboard>
                        );
        }
        }





export default Applicantadmissionform;
