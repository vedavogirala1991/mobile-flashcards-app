//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, ScrollView,ImageBackground , TouchableOpacity,Animated,LogBox} from 'react-native'
import {MaterialCommunityIcons,Ionicons} from '@expo/vector-icons'
import TextButton from './TextButton'
import bgimage from '../images/bgimage.png'


class Results extends Component {
  state = {
    bounceValue : new Animated.Value(1),
  }

  componentDidMount () {
    const {bounceValue} = this.state
    Animated.sequence([
          Animated.timing(bounceValue,{duration : 200, toValue : 1.04,useNativeDriver : true}),
          Animated.spring(bounceValue,{toValue : 1, friction : 4, useNativeDriver : true}),
        ]).start()
    LogBox.ignoreLogs(['Animated: `useNativeDriver`'])
  }

  render () {
    const {correct,count,reset,back,home} = this.props
    const {bounceValue} = this.state
    const score = Math.round((correct/count)*100)

    return (
      <View style={styles.container}>
        <View style={styles.results}>
          <ImageBackground  style={styles.violet } source={bgimage}>
            <View style={styles.borderline}>
              <Text style={styles.resultsTitle}>Quiz Complete!</Text>
              <Text style={styles.resultDetails}>{correct}/{count} are correct</Text>
              {score === 100
                ? <Animated.View style={{alignSelf:'center',transform : [{scale : bounceValue}]}}>
                    <Text style={styles.resultLine}>Great job!!</Text>
                    <Ionicons name='happy-sharp' size={80} color='#ffbf00' style={{marginTop : 10,alignSelf:'center'}}/>
                  </Animated.View>
                : (score >= 50)
                  ? <Animated.View style={{alignSelf:'center',transform : [{scale : bounceValue}]}}>
                      <Text style={styles.resultLine}>Way to go!!</Text>
                      <MaterialCommunityIcons name='emoticon-happy' size={80} color='#ffbf00' style={{marginTop : 10,alignSelf:'center'}}/>
                    </Animated.View>
                  : <Animated.View style={{alignSelf:'center',transform : [{scale : bounceValue}]}}>
                      <Text style={styles.resultLine}>Keep studying to improve your score!</Text>
                      <MaterialCommunityIcons name='emoticon-sad' size={80} color='#ffbf00' style={{marginTop : 10,alignSelf:'center'}}/>
                    </Animated.View>
              }
              <Text style={styles.resultDetails}>You scored</Text>
              <Text style={styles.resultDetails}>{score}%</Text>
            </View>
            <TouchableOpacity
              style={styles.retakeQuizBtn}
              onPress={() => {reset()}}>
              <Text style={styles.quizBtnText}>RETAKE QUIZ</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.backToDeckSection}>
          <TouchableOpacity
            onPress={() => {back()}}>
            <Text style={styles.backToDeckBtn}>BACK TO DECK</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity  style={styles.homeBtn}
          onPress={() => {home()}}>
          <Text style={styles.homeBtnTxt}>HOME</Text>
        </TouchableOpacity>
      </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  results : {
    backgroundColor : '#6608c1',
    height : 400,
    width : 320,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginLeft : 10,
    marginRight : 10,
    marginTop : 50,
    paddingTop : 10,
    justifyContent : 'center',
    shadowRadius : 3,
    shadowOpacity : 0.8,
    shadowColor : '#666666',
    shadowOffset : {
      width : 0,
      height : 3,
    },
  },
  violet : {
    marginTop : -20,
    width : '100%',
    height : 420,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow : 'hidden',
  },
  resultsTitle : {
    color : '#fff',
    fontSize : 25,
    fontWeight : 'bold',
    marginTop : 20,
    alignSelf : 'center',
  },
  resultDetails : {
    marginTop : 20,
    alignSelf : 'center',
    color : 'white',
    fontWeight : 'bold',
  },
  resultLine : {
    marginTop : 20,
    alignSelf : 'center',
    color : '#fff',
    fontWeight : 'bold',
  },
  borderline : {
    alignSelf : 'center',
    paddingBottom : 30,
    width : 250,
    borderBottomColor: '#fff',
    borderBottomWidth: 3,
  },
  retakeQuizBtn : {
    backgroundColor : '#fff',
    alignSelf : 'center',
    width : 250,
    marginTop : 40,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  quizBtnText : {
    color : '#6608c1',
    alignSelf : 'center',
    padding : 18,
  },
  backToDeckSection : {
    backgroundColor : '#6608c1',
    alignSelf : 'center',
    width : 250,
    marginTop : 40,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  backToDeckBtn : {
    color : '#fff',
    alignSelf : 'center',
    padding : 18,
  },
  homeBtn : {
    width : 250,
    alignItems : 'center',
    alignSelf : 'center',
    marginTop : 50,
    borderColor : '#6608c1',
    borderWidth : 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  homeBtnTxt : {
    color : '#6608c1',
    padding : 18,
  },
})

export default Results
