import { AsyncStorage } from 'react-native'
import {retrieveDecks,addDeck,FLASHCARDS_STORAGE_KEY} from './_decks'

export const fetchDeckDetails = () => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(retrieveDecks)
}

export const fetchDeck = (deckName) => {
  AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
  return JSON.parse(AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY))[deckName]
}

export const addDeckDetails = (deck) => {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY,
    JSON.stringify({deck}))
}

export const addDeckCardDetails = ({deckName,ques}) => {
  const deck = fetchDeck(deckName)

  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY,
    JSON.stringify({
      [deckName] : {
        questions : [...deck.questions].concat(ques)
      }
    })
  )
}
