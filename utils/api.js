import { AsyncStorage } from 'react-native'
import {retrieveDecks,FLASHCARDS_STORAGE_KEY} from './_decks'

export const fetchDeckDetails = async () => {
  try {
    const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    console.log('fetchDeckDetails :: ',results)
    return results != null ? JSON.parse(results) : storeDeskResults(retrieveDecks())
  } catch (err) {
    console.log('Error while fetching decks :: ',err)
  }

}

const storeDeskResults = async (decks) => {
  try {
    console.log('storeDeskResults : decks : ',decks)
    const decksValue = JSON.stringify(decks)
    await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY,decksValue)
  } catch (err) {
    console.log('Error while storing decks :: ',err)
  }
}

export const fetchDeck = async (deckName) => {
  try {
    console.log('fetchDeck : deckName : ',deckName)
    const decks = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    console.log('fetchDeck : decks : ',JSON.parse(decks)[deckName])
    return JSON.parse(decks)[deckName]
  } catch (err) {
    console.log('Error while fetching deck - ',deckName,' :: ',err)
  }
}

export const addDeckDetails = async (deckName) => {
  try {
    await AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY,
     JSON.stringify({
       [deckName] : {
         title : deckName,
         questions : [],
       }
     }))
    const decks = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    console.log('addDeckDetails : decks : ',JSON.parse(decks))
  }
  catch (err) {
    console.log('Error while saving deck - ',err)
  }
}

export const addDeckCardDetails = async (deckName,card,decks) => {
  console.log('addDeckCardDetails : deckName : ',deckName)
  console.log('addDeckCardDetails : card : ',card)
  const deck = fetchDeck(deckName)
  console.log('addDeckCardDetails : deck : ',deck)
  try {
    await AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY,
     JSON.stringify({
       [deckName] : {
         questions : [...deck.questions].concat(card)
       }
     }))
    const decks = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    console.log('addDeckDetails : decks : ',JSON.parse(decks))
  }
  catch (err) {
    console.log('Error while saving a card to deck - ',err)
  }
}

export const removeDeckDetails = async (title) => {
  try {
    const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    if(results!==null) {
      const data = JSON.parse(results)
      data[title] = undefined
      delete data[title]
      await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY,JSON.stringify(data))
    }
  } catch (err) {
    console.log('Error while removing the deck - ',err)
  }
}

export const resetDecks = async () => {
  try {
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(retrieveDecks()))
  } catch (err) {
    console.log('Error while resetting deck data - ',err)
  }
}
