import React, { Component } from "react";
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
  TouchableOpacity,
   View
} from "native-base";


import styles from "./styles";
import commonstyle from "../../themes/common";

class Document extends Component {
 
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
            <Title>About Us</Title>
          </Body>
          <Right />

        </Header>      
      
      <Content padder>

                <View>
                
                   
                
                </View>
                
                                
       </Content>
       
      </Container>
      
      
      
      
    );
  }
}

export default Document;