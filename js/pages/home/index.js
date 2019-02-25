import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  H3,
  ActionSheet,
   View,
  Button,
  Card, 
  CardItem,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body
} from "native-base";
import { Platform,AsyncStorage, KeyboardAvoidingView } from 'react-native';


import styles from "./styles";
import commonstyle from "../../themes/common";


import { Image, TouchableHighlight, Navigator } from 'react-native';

// either import the whole module and call as Communications.method()
import Communications from 'react-native-communications';

const testimg = require("../../../img/drawer-cover.png");



var BUTTONS = ["US", "UK", "India", "Canada", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;




class Home extends Component {
    
constructor(props) {
    super(props);

this.state = {
      data: 'none'
    };

console.debug('startup');

  }    
  

    async componentDidMount() {
     


AsyncStorage.getAllKeys((err, keys) => {  AsyncStorage.multiGet(keys, (err, stores) => 
    { stores.map((result, i, store) => {  
            

let key = store[i][0]; 

let value = store[i][1];
console.log(key);
console.log(value);


                });
            });
        });
  
 
  // ASYNC STORAGE TO STATE 

  }   
    
    
    
  


 async applyloan() {
       
 this.props.navigation.navigate('Loanapply');

}  

async SearchCollege(){
  this.props.navigation.navigate('Listing');
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
            <Title>Credenc</Title>
          </Body>
          <Right />

        </Header>

        <Content>

          <Image square source={testimg} style={{height:200}}/>

           <View style={styles.homeheadingview}>
               <Text style={styles.heading}>Quick Loan</Text>
          </View>
          <View style={styles.homeTextview}>
              <Text style={styles.homecontent}> 
                  Its quick, easy and secure. No paper work.
               </Text>
              <Text style={styles.homecontent}>
                 Get Your Loan Approved in 4 minutes.
              </Text>
            </View>

          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
          <Button warning onPress={this.SearchCollege.bind(this)}>
            <Text>Colleges</Text>
          </Button>

          <Button warning style={{marginLeft:5}} onPress={this.applyloan.bind(this)}>
            <Text>Apply Loan</Text>
          </Button>
          </View>


         
        </Content>

          <Footer>
          <FooterTab>
            <Button active full onPress={() => Communications.phonecall('9868773649', true)}>
              <Icon  name="call" />
            </Button>
            <Button active full>
              <Icon  name="search"  onPress={() => this.props.navigation.navigate('Listing')}/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Home;
