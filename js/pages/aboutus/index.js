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
  Body
} from "native-base";

import styles from "./styles";
import commonstyle from "../../themes/common";
//import BackgroundJob from 'react-native-background-job';

const myJobKey = "Hej";

//BackgroundJob.setGlobalWarnings(false);


//BackgroundJob.register({
//  jobKey: myJobKey,
//  job: () => this.runBackground()
//});








class Aboutus extends Component {
    constructor(props) {
    super(props);

this.state = {
      data: false
    };

console.debug('startup');

  }  
    
 runBackground()
 {
     this.setState({ data: true });
     
 }
    
_jobRun () {
     BackgroundJob.schedule({
              jobKey: myJobKey,
              period: 5000,
           
              allowExecutionInForeground: true
            });

	}
    
    
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
          <Text>
            Credenc is a startup at the confluence of education and finance technologies. We aim to disrupt the education loans industry by deploying technology to reduce inefficiencies in the lending process as well as by enabling financial institutions to process more and more education loans by helping them with alternate credit scoring models.
          </Text>
{ this.state.data && 
          <Text>
            Our fundamental belief is that providing access to finance for education is the most sustainable way of encouraging people to enhance their skills by investing in education and thereby increasing their employability. With ever increasing cost of education, there is an urgent requirement to solve the problem of access to finance for education. Our vision is to leverage technology to significantly increase education loan penetration in India.
          </Text>
    }          
        </Content>

        <Footer>
          <FooterTab>
            <Button active full onPress={this._jobRun} >
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Aboutus;
