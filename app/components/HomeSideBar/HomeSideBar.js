import React from "react";
import { View } from 'react-native'
import { List, ListItem, Divider } from 'react-native-elements'

const list = [
  {
    title: 'Recent Reports',
    icon: 'av-timer'
  },
  {
    title: 'Trending Reports',
    icon: 'flight-takeoff',
  },
  {
    title: 'Add Report',
    
  }
];

class HomeSidebar extends React.Component {
  render() {
    return (
      <View>
        <List>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{name: item.icon}}
              />
            ))
          }
        </List>
      </View>
    )
  }
}

  export default HomeSidebar;