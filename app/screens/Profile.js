import React from "react";
import { View } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { onSignOut } from "../auth";

// import firebase from '../config/firebase';

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDodqOifEIpC90L6jUfsefJ7q7OlSrFKNc",
  authDomain: "ipublico-a8719.firebaseapp.com",
  databaseURL: "https://ipublico-a8719.firebaseio.com",
  storageBucket: "ipublico-a8719.appspot.com",
};

// firebase.initializeApp(firebaseConfig);


class Profile extends React.Component {

  userSignOut = () => {
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
      onSignOut().then(() => this.props.navigation.navigate("SignedOut"))
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }
  
  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card title="John Doe">
          <View
            style={{
              backgroundColor: "#bcbec1",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: "center",
              marginBottom: 20
            }}
          >
            <Text style={{ color: "white", fontSize: 28 }}>JD</Text>
          </View>
          <Button
            backgroundColor="#03A9F4"
            title="SIGN OUT"
            onPress={() => this.userSignOut()}
          />
        </Card>
      </View>
    );
  }
}

export default Profile;