import { AsyncStorage } from 'react-native'
import {formatDeck} from './helpers'
import {retrieveDecks,addDeck,FLASHCARDS_STORAGE_KEY} from './_decks'

export const fetchDeckDetails = () => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(retrieveDecks)
}

export const addDeckDetails = (deck) => {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY,
    JSON.stringify({deck}))
}
