import React, { Component  } from "react";
import { Platform , Image,Alert} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  H3,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
   
    ActionSheet
} from "native-base";

import styles from "./styles";
import commonstyle from "../../themes/common";

//import Exponent, { DocumentPicker, Constants, ImagePicker, registerRootComponent,FileSystem, Location, Permissions , Asset} from 'expo';


class Contactus extends Component {
    
constructor(props) {
    super(props);
    this.state = {};
  }    
 
 //LOCATION

 
 
 // LOCATION
 

// CONTACT UPLOAD

// CONTACT UPLOAD

// LOCATION
contacts = async () =>
{
    console.log('hello');
}
// LOCATION


  render() {
    return (
      <Container style={commonstyle.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Contact Us</Title>
          </Body>
          <Right />

        </Header>

        <Content padder>
        
        <Text>
            {this.state.location}
          </Text>
         <Text>
            Get in Touch
          </Text>

          <Text>
            C-1642 , Sushant Loak Rd , Block C , Gurugram
          </Text>
          
          <Text>
            No : +91 9868773649
          </Text>



       <Button
            onPress={this.contacts} >
         <Icon name='cloud-upload' />
            <Text>Contacts</Text>
          </Button>


        </Content>
      </Container>
    );
  }
}

export default Contactus;
