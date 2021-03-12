import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import { resetDecks } from '../utils/api.js'
import { connect } from 'react-redux'
import { resetStore } from '../actions'

class Settings extends Component {
  handleResetDecks = () => {
    const {navigation } = this.props

    resetStore()

    resetDecks()
    navigation.goBack()
  }
  render() {
    return (
      <View style={styles.container}>
        <Text> Settings </Text>
        <View>
          <View>
            <Text>
              This will reset the data back to the original data set.
            </Text>
            <View style={{ height: 20 }} />
            <TextButton
              style={{ backgroundColor: 'red', borderColor: 'white' }}
              onPress={this.handleResetDecks}>
              Reset Data
            </TextButton>
          </View>
        </View>
      </View>
    )
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

export default connect(null)(Settings)
