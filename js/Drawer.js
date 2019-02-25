/* @flow */

import React from "react";
import { DrawerNavigator } from "react-navigation";

import Home from "./pages/home/";

import SideBar from "./pages/sidebar";
import Contactus from "./pages/contactus";
import Aboutus from "./pages/aboutus";
import Login from "./pages/login";
import Logout from "./pages/logout";
import Document from "./pages/document";




import Loanapply from "./pages/loanapply";

import Customerimageform from "./pages/loanapply/customerimageform";
import Customeradmitform from "./pages/loanapply/customeradmitform";

import Loanapplystart from "./pages/loanapply/loanapplystart";
import Applicantadmissionform from "./pages/loanapply/applicantadmissionform";
import Applicantprofessionalform from "./pages/loanapply/applicantprofessionalform";
import Coapplicantdetailform from "./pages/loanapply/coapplicantdetailform";
import Coapplicantdocform from "./pages/loanapply/coapplicantdocform";
import Coapplicantkycform from "./pages/loanapply/coapplicantkycform";
import Applicantkycform from "./pages/loanapply/applicantkycform";
import Loanapplicationsuccessful from "./pages/loanapply/loanapplicationsuccessful";
import Bankloanoffer from "./pages/loanapply/bankloanoffer";
import Profile from "./pages/loanapply/profile";
import Intro from "./pages/intro";

const DrawerExample = DrawerNavigator(
  {
    Home: { screen: Home },
    
    Contactus: { screen: Contactus },
    Aboutus: { screen: Aboutus },
     Login: { screen: Login ,navigationOptions: {
  drawerLockMode: 'locked-closed'
}},
     Logout: { screen: Logout },
     Document: { screen: Document },
   
    
     
     Loanapply: { screen: Loanapply },
     
     Loanapplystart: { screen: Loanapplystart ,navigationOptions: {
  drawerLockMode: 'locked-closed'
}},
   
   Customerimageform: { screen: Customerimageform  ,navigationOptions: {
  drawerLockMode: 'locked-closed'
}},
   
   Customeradmitform: { screen: Customeradmitform  ,navigationOptions: {
  drawerLockMode: 'locked-closed'
}},

Applicantadmissionform: { screen: Applicantadmissionform  ,navigationOptions: {
  drawerLockMode: 'locked-closed'
}},

Applicantprofessionalform: { screen: Applicantprofessionalform  ,navigationOptions: {
  drawerLockMode: 'locked-closed'
}},
  
  Coapplicantdetailform: { screen: Coapplicantdetailform  ,navigationOptions: {
  drawerLockMode: 'locked-closed'
}},

  Coapplicantdocform: { screen: Coapplicantdocform  ,navigationOptions: {
  drawerLockMode: 'locked-closed'
}},
   
   Coapplicantkycform: { screen: Coapplicantkycform  ,navigationOptions: {
  drawerLockMode: 'locked-closed'
}},
   
    Applicantkycform: { screen: Applicantkycform  ,navigationOptions: {
  drawerLockMode: 'locked-closed'
}},
  
      Loanapplicationsuccessful: { screen: Loanapplicationsuccessful ,navigationOptions: {
  drawerLockMode: 'locked-closed'
}},
   
   Bankloanoffer: { screen: Bankloanoffer ,navigationOptions: {
  drawerLockMode: 'locked-closed'
}},

 Profile: { screen: Profile ,navigationOptions: {
  drawerLockMode: 'locked-closed'
}},
   
 

      Intro: { screen: Intro ,navigationOptions: {
  gesturesEnabled: false,
  drawerLockMode: 'locked-closed'
}}
     
    
  },
  {
    initialRouteName: "Intro",
    drawerOpenRoute: 'DrawerOpen',
drawerCloseRoute: 'DrawerClose',
drawerToggleRoute: 'DrawerToggle',
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export default DrawerExample;
