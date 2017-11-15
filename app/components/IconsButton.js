import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Button, StyleSheet } from 'react-native';

const IconButton = (props) => {
  const { goTo, iconName, navigation } = props;

  return (
    <Ionicons 
      name={iconName} 
      style={styles.icon} 
      onPress={() => navigation.navigate(goTo)} 
    />
  )
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
    margin: 15,
    color: '#ffffff'
  }
})

export default IconButton;