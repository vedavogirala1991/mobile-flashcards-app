//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
//UI components
import TextButton from './TextButton'

class AddDeck extends Component {
  render () {
    const deck = this.props.deck

    return (
      <View style={styles.container}>
        <Text>Enter the Deck Title</Text>
        <TextInput
          style={{ width : 200,height: 40, borderColor: 'gray', borderWidth: 1 }}>
        </TextInput>
        <TextButton onPress={console.log('On Press')} style={{margin : 20}}>
          Submit
        </TextButton>
      </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default AddDeck
