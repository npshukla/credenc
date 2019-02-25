import React, { Component,Image } from "react";
import { View ,Platform,AsyncStorage, KeyboardAvoidingView } from 'react-native';
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



import styles from "./styles";
const drawerImage = require("../../../img/bitmap.png");
class Loanapplystart extends Component {
 constructor(props) {
    super(props);

this.state = {  
      basic_detail_step: 'not-started',
       applicant_profile_image_step: 'not-started',
        admission_detail_step: 'not-started',
         applicant_kyc_detail_step: 'not-started',
         admission_doc_detail_step: 'not-started',
         applicant_prof_detail_step: 'not-started',
         coapplicant_detail_step: 'not-started',
         coapplicant_kyc_step: 'not-started',
         coapplicant_professional_detail_step: 'not-started',
         application_complete: 'not-started'
             
         
      
            
    };

console.debug('startup');

  } 
  
  
   async componentDidMount() {
     
  //ASYNC STORAGE TO STATE       
console.log(this.state.basic_detail_step);


AsyncStorage.getAllKeys((err, keys) => {  AsyncStorage.multiGet(keys, (err, stores) => 
    { stores.map((result, i, store) => {  
            

let key = store[i][0]; 

let value = store[i][1];
console.log(key+'::'+value);
//console.log(value);
//this.setState({ [key]: value });

AsyncStorage.removeItem(key);

                });
            });
        });
  
 
  // ASYNC STORAGE TO STATE 

  }
  
  
  
 

async  nextCard(step) 
 {

 if(step == 'basic_detail_step')
 {
  if(this.state.basic_detail_step == 'partial_complete' || this.state.basic_detail_step == 'complete')
  {
   nextStage = 'Loanapplystart';    
  }
            
            
 }
 
 if(step == 'applicant_profile_image_step')
 {
  if(this.state.applicant_profile_image_step == 'partial_complete' || this.state.applicant_profile_image_step == 'complete')
  {
   nextStage = 'Customerimageform';    
  }
            
            
 }
 
 
 if(step == 'admission_detail_step')
 {
  if(this.state.admission_detail_step == 'partial_complete' || this.state.admission_detail_step == 'complete')
  {
   nextStage = 'Customeradmitform';    
  }
            
 }
 
 if(step == 'applicant_kyc_detail_step')
 {
  if(this.state.applicant_kyc_detail_step == 'partial_complete' || this.state.applicant_kyc_detail_step == 'complete')
  {
   nextStage = 'Applicantkycform';    
  }
            
            
 }
 
 if(step == 'admission_doc_detail_step')
 {
  if(this.state.admission_doc_detail_step == 'partial_complete' || this.state.admission_doc_detail_step == 'complete')
  {
   nextStage = 'Applicantadmissionform';    
  }
            
 }
 
 if(step == 'applicant_prof_detail_step')
 {
  if(this.state.applicant_prof_detail_step == 'partial_complete' || this.state.applicant_prof_detail_step == 'complete')
  {
   nextStage = 'Applicantprofessionalform';    
  }
            
            
 }
 
 if(step == 'coapplicant_detail_step')
 {
  if(this.state.coapplicant_detail_step == 'partial_complete' || this.state.coapplicant_detail_step == 'complete')
  {
   nextStage = 'Coapplicantdetailform';    
  }
            
            
 }
 
 if(step == 'coapplicant_kyc_step')
 {
  if(this.state.coapplicant_kyc_step == 'partial_complete' || this.state.coapplicant_kyc_step == 'complete')
  {
   nextStage = 'Coapplicantkycform';    
  }
            
            
 }
 
 if(step == 'coapplicant_professional_detail_step')
 {
  if(this.state.coapplicant_professional_detail_step == 'partial_complete' || this.state.coapplicant_professional_detail_step == 'complete')
  {
   nextStage = 'Coapplicantdocform';    
  }
            
            
 }
 
 
  this.props.navigation.navigate(nextStage);
        
    
 }

 
startCard = async () => 
 {
     
 //this.props.navigation.navigate('Loanapplystart');    
  console.log(this.state.basic_detail_step);   
 

   
  nextStage = 'Loanapplystart';   
  
  if(this.state.basic_detail_step == 'partial_complete')
  {
   nextStage = 'Loanapplystart';    
  }
  else if(this.state.applicant_profile_image_step == 'partial_complete')
  {
   nextStage = 'Customerimageform';    
  }
   else if(this.state.admission_detail_step == 'partial_complete')
  {
    nextStage = 'Customeradmitform';   
  }
   else if(this.state.applicant_kyc_detail_step == 'partial_complete')
  {
     nextStage = 'Applicantkycform';  
  }
   else if(this.state.admission_doc_detail_step == 'partial_complete')
  {
    nextStage = 'Applicantadmissionform';   
  }
   else if(this.state.applicant_prof_detail_step == 'partial_complete')
  {
     nextStage = 'Applicantprofessionalform';  
  }
  else if(this.state.coapplicant_detail_step == 'partial_complete')
  {
   nextStage = 'Coapplicantdetailform';    
  }
  else if(this.state.coapplicant_kyc_step == 'partial_complete')
  {
    nextStage = 'Coapplicantkycform';   
  }
  else if(this.state.coapplicant_professional_detail_step == 'partial_complete')
  {
    nextStage = 'Coapplicantdocform';   
  }
   else if(this.state.application_complete == 'partial_complete')
  {
    nextStage = 'Loanapplystart';   
  }
  else
  {
   nextStage = 'Loanapplystart';   
  }
  
 //console.log(nextStage); 
 this.props.navigation.navigate(nextStage);
        
    
    
 }




render() {
    
  

    const forwardIcon = <Icon name={'ios-arrow-forward'} color={'gray'} size={20} />;
    const alertIcon = <Icon name={'ios-alert'} color={'gray'} size={20} />;
    return (
       <Container style={styles.container}>
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

        <Content style={styles.content}>     
            
     <View>
           
           <Card>
           <Text>
                  Welcome to Credenc , Follow these steps to complete your loan application
                </Text>
           
          <Card>
            <CardItem button onPress={() =>  this.nextCard('basic_detail_step')}>
            
            { this.state.basic_detail_step == 'complete' &&
              <Icon active name="checkmark-circle" style={{ color: 'green'}} />
              } 
              { this.state.basic_detail_step == 'partial_complete' &&
              <Icon active name="checkmark-circle" style={{color: 'yellow'}} />
              }
              
              <Text>Basic Detail</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
            
           </Card>
           <Card>
            <CardItem button onPress={() =>  this.nextCard('applicant_profile_image_step')}>
              { this.state.applicant_profile_image_step == 'complete' &&
              <Icon active name="checkmark-circle" style={{ color: 'green'}} />
              } 
              { this.state.applicant_profile_image_step == 'partial_complete' &&
              <Icon active name="checkmark-circle" style={{color: 'yellow'}} />
              }
             
             
              <Text>Upload Your Pic</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
            
           </Card>
           <Card>
            <CardItem button onPress={() =>  this.nextCard('admission_detail_step')}>
             { this.state.admission_detail_step == 'complete' &&
              <Icon active name="checkmark-circle" style={{ color: 'green'}} />
              } 
              { this.state.admission_detail_step == 'partial_complete' &&
              <Icon active name="checkmark-circle" style={{color: 'yellow'}} />
              }
            
              <Text>Admission Detail</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
            
           </Card>
           
            <Card>
            <CardItem button onPress={() =>  this.nextCard('applicant_kyc_detail_step')}>
             { this.state.applicant_kyc_detail_step == 'complete' &&
              <Icon active name="checkmark-circle" style={{ color: 'green'}} />
              } 
              { this.state.applicant_kyc_detail_step == 'partial_complete' &&
              <Icon active name="checkmark-circle" style={{color: 'yellow'}} />
              }
              <Text>Applicant KYC</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
            
           </Card>
           
            <Card>
            <CardItem button onPress={() =>  this.nextCard('admission_doc_detail_step')}>
             { this.state.admission_doc_detail_step == 'complete' &&
              <Icon active name="checkmark-circle" style={{ color: 'green'}} />
              } 
              { this.state.admission_doc_detail_step == 'partial_complete' &&
              <Icon active name="checkmark-circle" style={{color: 'yellow'}} />
              }
              <Text>Admission Doc</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
            
           </Card>
           
            <Card>
            <CardItem button onPress={() =>  this.nextCard('applicant_prof_detail_step')}>
             { this.state.applicant_prof_detail_step == 'complete' &&
              <Icon active name="checkmark-circle" style={{ color: 'green'}} />
              } 
              { this.state.applicant_prof_detail_step == 'partial_complete' &&
              <Icon active name="checkmark-circle" style={{color: 'yellow'}} />
              }
              <Text>Professional Detail ( Applicant )</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
            
           </Card>
           
            <Card>
           <CardItem button onPress={() =>  this.nextCard('coapplicant_detail_step')}>
             { this.state.coapplicant_detail_step == 'complete' &&
              <Icon active name="checkmark-circle" style={{ color: 'green'}} />
              } 
              { this.state.coapplicant_detail_step == 'partial_complete' &&
              <Icon active name="checkmark-circle" style={{color: 'yellow'}} />
              }
              <Text>Co Applicant Detail</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
            
           </Card>
           
         
           
           <Card>
          <CardItem button onPress={() =>  this.nextCard('coapplicant_kyc_step')}>
             { this.state.coapplicant_kyc_step == 'complete' &&
              <Icon active name="checkmark-circle" style={{ color: 'green'}} />
              } 
              { this.state.coapplicant_kyc_step == 'partial_complete' &&
              <Icon active name="checkmark-circle" style={{color: 'yellow'}} />
              }
              <Text>Co Applicant KYC</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
            
           </Card>
           
           <Card>
          <CardItem button onPress={() =>  this.nextCard('coapplicant_professional_detail_step')}>
             { this.state.coapplicant_professional_detail_step == 'complete' &&
              <Icon active name="checkmark-circle" style={{ color: 'green'}} />
              } 
              { this.state.coapplicant_professional_detail_step == 'partial_complete' &&
              <Icon active name="checkmark-circle" style={{color: 'yellow'}} />
              }
              <Text>Co Applicant Professional</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
            
           </Card>
           
           <Card>
            <CardItem button onPress={() =>  this.nextCard('application_complete')}>
             { this.state.application_complete == 'complete' &&
              <Icon active name="checkmark-circle" style={{ color: 'green'}} />
              } 
              { this.state.application_complete == 'partial_complete' &&
              <Icon active name="checkmark-circle" style={{color: 'yellow'}} />
              }
              <Text>Done</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
            
           </Card>
           
           
            </Card>       
            
        </View>
      
     
      
      
      
     
     
      
      </Content>
      
       <Footer>
          <FooterTab>
       
           
            <Button warning iconRight full onPress={this.startCard} style={styles.stepbutton}>
            <Text>Start</Text>
            <Icon name='arrow-forward' />
          </Button>
            
          </FooterTab>

        </Footer>
      
      
      
      </Container>
);
                }
            }
            


    
    
export default Loanapplystart;
