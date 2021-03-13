import {AsyncStorage} from 'react-native'
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'

const NOTIFICATION_KEY = 'MobileFlashCards:notifications'

export const formatDeck = (key) => {
  return {
    [key] : {
      title : key,
      questions : [],
    }
  }
}

export const formatCards = (deck) => {
  const cards = deck.questions.map((card,index)=>
  {
    return {
      index,
      question : card.question,
      answer : card.answer,
      display : 'question',
      answered : false,
    }
  })
  return cards
}

export const clearLocalNotification = async () => {
  try {
    await AsyncStorage.removeItem(NOTIFICATION_KEY)
    Notifications.cancelAllScheduledNotificationsAsync()
  } catch (err) {
    console.log('Error while clearing the notification - ',err)
  }
}

const createNotification = () => {
  return {
    title : 'Mobile Flashcards Reminder',
    body : "👋 Don't forget to study for today!",
    ios : {
      sound : true,
    },
    android : {
      sound : true,
      priority : 'high',
      sticky : false,
      vibtrate : true,
    }
  }
}

const cancelAndSchedule = async () => {

  await Notifications.cancelAllScheduledNotificationsAsync()

  let trigger = new Date()

  trigger.setDate(trigger.getDate()+1)
  trigger.setHours(20)
  trigger.setMinutes(0)


  await Notifications.scheduleNotificationAsync({
    content : createNotification(),
    trigger,
  })

}

export const setLocalNotification = async () => {
  try {
    await AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data)=> {
        if(data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({status})=> {
              if(status === 'granted') {
                cancelAndSchedule()

                AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true))
              }
            })
        }
      })
  } catch (err) {
    console.log('Error while Setting Notifications : ',err)
  }
}
