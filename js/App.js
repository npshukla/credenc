/* @flow */

import React from "react";

import { Platform } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";

import Drawer from "./Drawer";


// CUSTOM PATH

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

const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer },
Intro: { screen: Intro ,navigationOptions: {
  gesturesEnabled: false
}}

        
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none",
    }
            
            
            
);

export default () =>
    <Root>
        <AppNavigator />
    </Root>;
