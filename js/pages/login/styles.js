const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
     justifyContent: 'center',
    alignItems: 'center'
  },
  
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  },
  loginbuttonview :
          {
              bottom: 6,
              marginTop:10, 
              marginLeft:15, 
              marginRight:15     
          },
          Dirloginbuttonview:{
            bottom: 6,
              marginTop:15, 
              marginLeft:15, 
              marginRight:15    
          },
          level:{
    padding:5,
    paddingTop:10,
    fontSize:13,
    color:'#000'
  },
  LoginText:{
    fontSize:13
  },
  InputField:{
    fontFamily: 'CircularStd',
    fontSize:13,
    color:'#2f2f2f'
  },
  loginHeader:{
    fontWeight:'normal',
    fontStyle:'normal',
    textAlign:'center',
    color:'#fff',
    fontSize:13
  }
};
