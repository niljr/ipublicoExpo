import React from "react";
import { View, Alert, Text, StyleSheet } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

import { onSignIn } from "../auth";
import firebase from '../config/firebase';

// import * as firebase from 'firebase';

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyDodqOifEIpC90L6jUfsefJ7q7OlSrFKNc",
//   authDomain: "ipublico-a8719.firebaseapp.com",
//   databaseURL: "https://ipublico-a8719.firebaseio.com",
//   storageBucket: "ipublico-a8719.appspot.com",
// };

// // firebase.initializeApp(firebaseConfig);

// firebase.initializeApp(firebaseConfig);

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: 'Test@test.com', 
      password: '123456', 
      error: '', 
      loading: false,
      animation: null,
    };
  }

  componentDidMount() {
    // this._playAnimation();
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("We are authenticated now!");
        onSignIn().then(() => this.props.navigation.navigate("SignedIn"));
      }
    
      // Do other things
    });
  }
  
  async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '1201023306707732',
      { permissions: ['public_profile'] }
    );
  
    if (type === 'success') {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
        // Alert.alert(
        //   'Logged in!',
        //   `Hi ${(await response.json()).name}!`,
        // );
        // FB.api(
        //   `/${response.json().id}/picture`,
        //   function (response) {
        //     if (response && !response.error) {
        //       /* handle the result */
        //       console.log(response);
        //     }
        //   }
        // );
      // Sign in with credential from the Facebook user.
      firebase.auth().signInWithCredential(credential).catch((error) => {
        // Handle Errors here.
      });
    }
  }

  onLoginPress() {
    this.setState({ error: '', loading: true });
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      this.state({ error: '', loading: false });
      onSignIn().then(() => this.props.navigation.navigate("SignedIn"));
    })
    .catch(() => {
      this.setState({ error: 'Authentication Failed', loading: false });
    })
  }

  render() { 
    return (
      // <View style={styles.animationContainer}>
      <View style={{ marginTop: 20 }}>
      {/* {this.state.animation &&
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 400,
              height: 400,
              backgroundColor: '#eee',
            }}
            source={this.state.animation}
          />} */}
        <Card>
          <FormLabel>Email</FormLabel>
          <FormInput 
            value = {this.state.email}
            onChangeText={email => this.setState({ email })}
            placeholder="test@me.com" 
          />
          <FormLabel>Password</FormLabel>
          <FormInput 
            value = {this.state.password}
            secureTextEntry
            placeholder='*******'
            onChangeText={password => this.setState({ password })}
          />
          <Text>{this.state.error}</Text>
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN IN"
            onPress={() => {
              this.onLoginPress();
            }}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN IN USING FACEBOOK"
            onPress={() => {
              this.loginWithFacebook(); 
            }}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN UP"
            onPress={() => {
              this.props.navigation.navigate("SignUp")
            }}
          />
        </Card>
      </View>
    );
  }

  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimationAsync();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  _loadAnimationAsync = async () => {
    let result = await fetch(
      'https://cdn.rawgit.com/airbnb/lottie-react-native/635163550b9689529bfffb77e489e4174516f1c0/example/animations/Watermelon.json'
    );

    this.setState(
      { animation: JSON.parse(result._bodyText) },
      this._playAnimation
    );
  };
}

const styles = StyleSheet.create({
  animationContainer: {
    // position: 'absolute',
    paddingVertical: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});


export default SignIn;