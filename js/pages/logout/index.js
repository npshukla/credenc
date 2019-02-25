import React, { Component } from "react";
import { Image, View, StatusBar ,AsyncStorage } from "react-native";

import { Container, Button, H3, Text, Header, Title, Body, Left, Right  } from "native-base";

import store from 'react-native-simple-store';

class Logout extends Component {
	// eslint-disable-line


constructor(props) {
    super(props);

console.debug('startup');

  }
  
 async componentDidMount() {
     
//AsyncStorage.getAllKeys((err, keys) => {  AsyncStorage.multiGet(keys, (err, stores) => 
//    { stores.map((result, i, store) => {  
//            
//
//let key = store[i][0]; 
//AsyncStorage.removeItem(key);
//
//
//                });
//            });
//        });
        
 AsyncStorage.clear();     
   
//  store.delete('login'); 
   //AsyncStorage.removeItem('introVisit');
  AsyncStorage.removeItem('userLogin');
 this.props.navigation.navigate('Login');
 
  }

 

	render() {
		return (
			<Container>
				<StatusBar barStyle="light-content" />
				
					
					
					<View style={{ flex: 1 }}>
                                            
                                          
                                  
					</View>
				
			</Container>
		);
	}
}

export default Logout;
