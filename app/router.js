import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import HomeSidebar from './components/HomeSideBar';
import AddReport from './screens/AddReport';

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

const drawerNav = DrawerNavigator(
  {
    Home: { screen: Home },
   
    // Profile:  { screen: StackNavigator({ Profile: { screen: Profile }}) },
    // Notifications: { screen: StackNavigator({ Notifications: { screen: Notifications }}) },
  },
  {
    contentComponent: props => <HomeSidebar {...props} />
  },
);

export const SignedOut = StackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In",
      // headerStyle
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up",
      // headerStyle
    }
  },
});

export const SignedIn = StackNavigator(
  {
    Home: {
      screen: drawerNav,
    },
    Profile: {
      screen: Profile,
    },
    AddReport: {
      screen: AddReport
    }
  },
);

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          // gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};