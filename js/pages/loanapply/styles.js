const React = require("react-native");
//import Exponent from 'expo';
const { StyleSheet } = React;

export default {
  container: {
    backgroundColor: "#352182",
   // marginTop: Exponent.Constants.statusBarHeight
   // fontFamily: 'CircularStd'
  },
  formdesign: {
      
     margin: 15,
     marginTop: 10 ,
     borderRadius: 4,
     borderWidth: 0.5,
     borderColor: 'white'
  },
  headercol:{
    backgroundColor:'transparent',
    elevation:0
  },

 stepbutton: {
    
     borderRadius: 0
    
  },
  Items:{
    borderBottomWidth:1,
    marginLeft:12
  },
  level:{
    padding:5,
    paddingTop:10,
    fontSize:14
  },
  ExamScorelevel:{
     padding:10,
    paddingTop:10,
    fontSize:14
  },

  laonAmountheading:{
    padding:10,
    fontSize:14
  },
  profileheading:{
    height:80,
  },
  logo:{
    height:30,
    width:100
  },
  marginInput:{
    marginLeft:10
  },
  perImg:{
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 200
  },
  profileImg:{
     width: 40,
    height: 40,
    backgroundColor: '#352182',
    borderRadius: 40
  },
  cameraImg:{
    width:20,
    height:20,
    backgroundColor:'#fff',
    marginRight:5
  },
  content:{
    backgroundColor:'white',
     borderTopLeftRadius:10,
     borderTopRightRadius:10
  },
  Profcontent:{
    backgroundColor:'white'
  },
  inlinecss:{
    flexDirection:'row', 
    flexWrap:'wrap'
  },
  successIcon:{
    color:'#32c179', 
    paddingLeft:3, 
    marginTop:1
  },
  successIcon1:{
    color:'#32c179', 
    marginTop:1
  },
  CrossIcon:{
    color:'red',
    paddingLeft:4, 
    marginTop:1
  },
  DocumentFont1:{
    fontSize:14,
    fontFamily: 'CircularStd'
  },
  DocumentFont2:{
    fontSize:14,
    color:'#32c179',
    fontFamily: 'CircularStd'
  },
  ListMargin:{
    marginLeft: 0, 
    paddingLeft: 0
  },
  InputField:{
    fontFamily: 'CircularStd',
    fontSize:14,
    color:'#2f2f2f'
  },
  scoreInput:{
    fontFamily: 'CircularStd',
    fontSize:14,
    color:'#2f2f2f',
    paddingLeft:10
  },
  RadioField:{
    fontFamily: 'CircularStd',
    fontSize:14,
    paddingLeft:10
  },
  pickerFont:{
    fontSize:14
  },
  credila:{
   height:20,
    width:80,
    paddingLeft:5
  },
  auxilo:{
      height:55,
    width:80  
  },
  avanse:{
   height:20,
    width:80,
     marginLeft:10
  },
  incred:{
   height:20,
    width:80,
    paddingLeft:10
  },
  axis:{
   height:20,
    width:80,
    marginLeft:10
  },
  RemoveBottomBorder:{
    borderBottomWidth:0
  },
  linearGradient1: {
    flex: 1
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'CircularStd',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  marginView:{
    width: window.width-20,
     marginLeft:10,
     marginRight:10
  },
   ProfileName:{
    marginTop:5, 
    marginBottom:5, 
    fontFamily: 'CircularStd', 
    fontWeight: 'bold',
    color: '#2f2f2f'
  },
  ProfileMainView:{
    backgroundColor:'#fcfcfc', 
    borderTopWidth:1, 
    borderBottomWidth:1, 
    borderColor:'#d6ecf1', 
    marginLeft:10
  },
  ProfileView:{
    margin:10,
    flex:1
  },
  ProgressHeading1:{
    color:'white', 
    paddingLeft:12, 
    paddingTop:20, 
    fontSize:16, 
    fontFamily: 'CircularStd',
    fontWeight: 'bold'
  },
  ProgressHeading2:{
    color:'white', 
    paddingLeft:12, 
    fontSize: 12, 
    fontFamily: 'CircularStd'
  },
  ProfilePhoto:{
    height:60, 
    width:60, 
    borderRadius:60
  },
  editProfile:{
    fontSize:11, 
    color:'#2f2f2f', 
    paddingTop:5,
     paddingBottom:10,
     fontFamily: 'CircularStd'
  },
  Profileheading1:{
    fontFamily: 'CircularStd'
  },
  Profileheading2:{
    fontFamily: 'CircularStd'
    
  },
  Informmation:{
    margin:20,
    flex:1
  },
  Informmation1:{
    margin:20,
    marginTop:15,
    marginLeft:15,
    flex:1
  },
  uploadImage:{
    width:15, 
    height:15, 
    marginLeft:5, 
    marginTop:3
  },
  MarginList:{
    marginLeft:-10
  },
  suggestion:{
    minHeight:30
  },
  sliderBox: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center"
  }
};
