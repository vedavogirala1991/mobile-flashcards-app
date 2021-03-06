//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const TextButton = ({children,onPress, style = {} }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.button, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button : {
    textAlign : 'center',
    fontWeight : 'bold',
    color : 'white',
    backgroundColor : '#292477',
    padding : 20,
    borderColor : '#292477',
    borderWidth : 1,
    borderRadius : 2,
  }
})

export default TextButton
