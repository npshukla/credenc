<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */





,BackHandler,ToastAndroid

this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {


                if (this.lastBackButtonPress + 2000 >= new Date().getTime()) {
                    BackHandler.exitApp();
                    return true;
                }
                ToastAndroid.show('Press again to exit :)', ToastAndroid.SHORT);
                this.lastBackButtonPress = new Date().getTime();

                return true;
                
             });
             
             
             
             
             
             async componentWillUnmount()  
{
    
 this.backButtonListener.remove();   
    
    
}
             
             