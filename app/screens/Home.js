import React from "react";
import { ScrollView, Text, Linking, View, Image, StatusBar } from "react-native";
import { Card, Button } from "react-native-elements";
import { Asset, AppLoading } from 'expo';

import firebase from '../config/firebase';
import ReportList from '../components/ReportList';
import IconButton from '../components/IconsButton';


class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'iPublico',
      headerStyle:{ backgroundColor: '#45AF52' },
      headerTitleStyle:{ color: '#ffffff'},
      headerLeft: <IconButton iconName='md-menu' navigation={navigation} goTo={'DrawerOpen'} />,
      // headerRight: <IconButton iconName='ios-map-outline' navigation={navigation} goTo={'Map'} />
      headerRight: <IconButton iconName='ios-map-outline' navigation={navigation} goTo={'AddReport'} />
    }
  };
  
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      isReady: false,
    };
  }

  componentDidMount() {
    firebase.database()
    .ref('reports')
    .on('value', (snapshot) => {
      // const value = snapshot.val();
      // console.log('value', value);
      let returnArr = [];
      snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val(); 
          item.key = childSnapshot.key;
          returnArr.push(item);
      });
      console.log(returnArr);
      this.setState({ reports:returnArr })
    });
    
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     let userData = {
    //       fbuid: user.uid,
    //       name: user.displayName,
    //       email :user.email,
    //       phoneNumber: user.phoneNumber,
    //       photoUrl: user.photoURL,
    //     };
    //     this.props.dispatch(setUserData(userData))
    //   } 
    // })
  }

  render() {
    // if (!this.state.isReady) {
    //   return (
    //     <AppLoading
    //       startAsync={this._cacheResourcesAsync}
    //       onFinish={() => this.setState({ isReady: true })}
    //       onError={console.warn}
    //     />
    //   );
    // }
    return(
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          <StatusBar backgroundColor={'#389143'} barStyle="light-content" />
            {
              this.state.reports.length > 0 ? 
                this.state.reports.map((report, i) => (
                  // this.renderItem(report, i)
                  <ReportList key={i} report={report} />
                ))
              :
              null
            }
        </ScrollView>
      </View>
    );
  }

  async _cacheResourcesAsync() {
    const images = [
      require('../../assets/images/robot-dev.png'),
      require('../../assets/images/robot-prod.png'),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages)

  }

}

export default Home;